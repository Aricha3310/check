import React, { useState } from "react";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import { firestore } from "../../utils/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";

interface DemoAppState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
  subject:Subject[]
}

interface Subject {
  _id: string;
  classroom: string;
  day: string;
  end_check_in: string;
  end_time: string;
  location: [];
  name: string;
  pictest: boolean;
  start_check_in: string;
  start_time: string;
  status: boolean;
  time_check_in: string;
}

export default class DemoApp extends React.Component<{}, DemoAppState> {
  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
    subject:[]
  };

  render() {
    return (
      <>
     <Grid container>
      <Grid item lg={9}>
<div className="demo-app">
        {/* {this.renderSidebar()} */}
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          />
        </div>
      </div>
      </Grid>
      <Grid item lg={3}>
<Box sx={{marginLeft:"24px",}}>
  <Box sx={{backgroundColor:'gray',padding:"20px"}}>
    <Typography>สถานะการเรียนการสอน</Typography>
  </Box>
</Box>
</Grid>
     </Grid>
          
      
    
    
     </>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo: DateSelectArg) => {
  console.log(selectInfo.start)
    // let calendarApi = selectInfo.view.calendar;
    // console.log(calendarApi,"kuy")
     
  }

  handleEventClick = (clickInfo: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events,
    });
  };
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <Box>
      <li key={event.id}>
        <b>
          {formatDate(event.start!, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    </Box>
  );
}


