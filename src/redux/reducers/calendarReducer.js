import { types } from '../types';

// {
//   id: +new Date(),
//   title: 'Cumpleaños del jefe',
//   start: moment().toDate(),
//   end: moment().add(2, 'hours').toDate(),
//   bgcolor: '#fafafa',
//   user: {
//     _id: '123',
//     name: 'Peepo',
//   }
// }

const initialState = {
  events: [],
  activeEvent: null
} 

export const calendarReducer = (state=initialState, action) => {
  switch (action.type) {

    case types.eventSetEvents:
      return {
        ...state,
        events: [...action.payload]
      }

    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      }

    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload]
      }

    case types.eventClearActive:
      return {
        ...state,
        activeEvent: null
      }
    
    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map(event => (
          event.id === action.payload.id
            ? action.payload
            : event
        ))
      }

    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(e => e.id !== state.activeEvent.id),
        activeEvent: null,
      }

    case types.eventLogout:
      return {
        ...initialState
      }


    default:
      return state;
  }
}