import {Component, OnInit} from '@angular/core';
import {CalendarOptions, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import deLocale from '@fullcalendar/core/locales/de';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {BuchungenDialogComponent} from "../buchungen-dialog/buchungen-dialog.component";
import {MatDialog} from '@angular/material/dialog';
import {BackendService} from "../backend-service/backend-service";
import {Buchung} from "../buchungen-dialog-model/model";

export interface DialogData {
  id: string;
  date: string;
  username: string;
  starttime: string;
  endtime: string;
  reason: string;
  allDay: boolean;
}

@Component({
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.css']
})

export class FullcalendarComponent implements OnInit {

  events: Object = [];
  initEvents: EventInput[] = [];
  username: string = '';
  reason: string = '';
  allDay: boolean = false;
  date: string = '';
  starttime: string = '07:00';
  endtime: string = '20:00';
  buttonNameChange = true;
  buttonName: 'zeige Wochenenden an' | 'blende Wochenenden aus' = 'zeige Wochenenden an';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    customButtons: {
      showWeekends: {
        text: 'Wochenenden',
        click: () => this.showWeekends()
      }
    },
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prevYear,prev,next,nextYear today showWeekends',
      center: 'title',
      right: 'dayGridMonth timeGridWeek timeGridDay listMonth'
    },
    weekends: false,
    weekNumbers: true,
    fixedWeekCount: false,
    showNonCurrentDates: false,
    editable: false,
    selectMirror: true,
    dayMaxEvents: true,
    locale: deLocale,
    eventColor: '#3775c6',
    initialEvents: [],
    eventDisplay: "block",
    displayEventTime: false,
    navLinks: true,
    dateClick: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  constructor(public dialog: MatDialog,
              public backendService: BackendService) {
  }

  public ngOnInit() {
    this.backendService.getAllBuchungen().subscribe((response: Buchung[]) => {
      const initEvents: EventInput[] = [];
      for (let i=0; i<response.length; i++) {
          initEvents.push(
            {
              id: response[i].id,
              title: response[i].allDay === true ? response[i].username : response[i].starttime + "-" + response[i].endtime + " " + response[i].username,
              start: response[i].date + 'T' + response[i].starttime + ':00',
              end: response[i].date + 'T' + response[i].endtime + ':00',
              description: response[i].reason,
              allDay: response[i].allDay,
              color: response[i].allDay === true ? "#93ceb3" : '#3775c6'
            }
          )
        }

      this.initEvents = initEvents;
    });
  }


  handleDateSelect(selectInfo: any) {
    selectInfo.dayEl.style.backgroundColor = '#ecf2f8';
    const dialogRef = this.dialog.open(BuchungenDialogComponent, {
      data: {
        id: '',
        date: selectInfo.dateStr,
        username: this.username,
        starttime: this.starttime,
        endtime: this.endtime,
        reason: this.reason,
        allDay: this.allDay
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      if(result) {
        calendarApi.addEvent({
          id: result.id,
          title: result.allDay ? result.username : result.starttime + "-" + result.endtime + " " + result.username,
          start: selectInfo.dateStr + 'T' + result.starttime + ':00',
          end: selectInfo.dateStr + 'T' + result.endtime + ':00',
          description: result.reason,
          allDay: result.allDay,
          color: result.allDay ? '#94d0b7' : '#3775c6'
        });
      }
      selectInfo.dayEl.style.backgroundColor = 'white';
    });
  }


  handleEventClick(selectInfo: any) {
    // update & delete
    const dialogRef = this.dialog.open(BuchungenDialogComponent, {
      data: {
        id: selectInfo.event.id,
        date: selectInfo.event.startStr.substring(0,10),
        username: selectInfo.event.allDay === true ? selectInfo.event.title : selectInfo.event.title.split(' ')[1],
        starttime: selectInfo.event.allDay === true ? '00:00' : selectInfo.event.title.substring(0,5),
        endtime: selectInfo.event.allDay === true ? '23:59' : selectInfo.event.title.substring(6,11),
        reason: selectInfo.event.extendedProps.description,
        allDay: selectInfo.event.allDay
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      // result is undefined when dialog is cancelled
      if (result !== undefined) {
        const calendarApi = selectInfo.view.calendar;
        const event = calendarApi.getEventById(result.id);
        if (result.delete) {
          // delete event
          event.remove();
        } else {
          // update event
          event.setProp('title', result.allDay === true ? result.username : result.starttime + "-" + result.endtime + " " + result.username);
          event.setExtendedProp('description', result.reason);
          event.setStart(selectInfo.event.startStr.substring(0, 10) + 'T' + result.starttime + ':00',);
          event.setEnd(selectInfo.event.startStr.substring(0, 10) + 'T' + result.endtime + ':00',);
          event.setAllDay(result.allDay);
          event.setProp('color', result.allDay === true ? "#93ceb3" : '#3775c6')
        }
      }
    });
  }

  showWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }

}
