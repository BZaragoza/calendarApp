import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer  } from 'react-big-calendar'
import moment from "moment";

import NavBar from "../ui/NavBar";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";

import { messages } from "../../helpers/calendar-messages-es";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es-mx'
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../redux/actions/ui";
import { eventClearActive, eventSetActive, startEventSetEvents } from "../../redux/actions/events";
import AddNewFab from "../ui/AddNewFab";
import { useSelector } from "react-redux";
import DeleteEventFab from "../ui/DeleteEventFab";

moment.locale('es')

const localizer = momentLocalizer(moment)


const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  
  const dispatch = useDispatch();
  const { events, activeEvent, } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startEventSetEvents());
  }, [dispatch])

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
  }

  const onViewChange = (e) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  }

  const onSelectSlot = (e) => {
    dispatch(eventClearActive());
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid===event.user._id ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }
     
    return {
      style
    }
  }

  return (
    <div className="calendar-screen">
      <NavBar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent
        }}
      />
      
      <AddNewFab />
      {activeEvent && <DeleteEventFab />}
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;

