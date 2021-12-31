import Swal from "sweetalert2";

import { types } from "../types";

import {fetchWithToken} from '../../helpers/fetch'
import { manipulateEvents } from '../../helpers/manipulateEvents';

export const startEventSetEvents = () => {
  return async dispatch => {
    const res = await fetchWithToken('events');
    const body = await res.json();

    const events = manipulateEvents(body?.events);

    dispatch(eventSetEvents(events))
  }
}

const eventSetEvents = (events) => ({
  type: types.eventSetEvents,
  payload: events
});

export const startEventAddNew = (event) => {
  return async (dispatch, getState) => {

    const {uid, name} = getState().auth;

   try {
    const res = await fetchWithToken('events', event, 'POST');
    const body = await res.json();

    if (body.ok) {
      event.id = body.event.id;
      event.user = {
        _id: uid,
        name
      }

      dispatch(eventAddNew(event))
    }

   } catch (error) {
    console.log(error)
   }
  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
})

export const startEventUpdate = (event) => {
  return async dispatch => {

    try {

      const res = await fetchWithToken(`events/${event.id}`, event, 'PUT');
      const body = await res.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        return Swal.fire('Error', body.msg, 'error')
      }


    } catch (error) {
      console.log(error)
    }

  }
}

const eventUpdated = (event) => ({
  type: types.eventUpdate,
  payload: event,
})

export const startEventDelete = () => {
  return async (dispatch, getState) => {

    const { activeEvent } = getState().calendar;

    try {
      const res = await fetchWithToken(`events/${activeEvent.id}`, {}, 'DELETE');
      const body = await res.json();

      if (body.ok) {
        dispatch(eventDeleted())
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }

  }
}

const eventDeleted = () => ({
  type: types.eventDeleted,
})

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
})  

export const eventClearActive = () => ({
  type: types.eventClearActive
})  

export const eventClearLogout = () => ({
  type: types.eventLogout
})