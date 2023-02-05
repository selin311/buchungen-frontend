import {Component, Inject} from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import deLocale from '@fullcalendar/core/locales/de';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {BuchungenDialogComponent} from "../buchungen-dialog/buchungen-dialog.component";
import {DateSelectArg} from "fullcalendar";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  reason: string;
}

@Component({
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.css']
})

export class FullcalendarComponent {

  Events: any[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prevYear,prev,next,nextYear today',
      center: 'title',
      right: 'dayGridMonth timeGridWeek timeGridDay listWeek'
    },
    weekends: false,
    weekNumbers: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: deLocale,
    eventBackgroundColor: '#0e5ba8',
    initialDate: '2023-01-20',
    /*dateClick: function(info) {
      /!*alert('Du hast folgenden Tag angeklickt: ' + info.dateStr);
      // change the day's background color
      info.dayEl.style.backgroundColor = '#7ab6c9';*!/
    }*/

    views: {
      dayGrid: {
        navLinks: true,
        navLinkDayClick: 'timeGridweek',

      },
    },

    select: this.handleDateSelect.bind(this),

    // dateClick: this.openDialog.bind(this),
    // select: this.handleDateSelect.bind(this),
  };


  handleDateSelect(selectInfo: DateSelectArg) {
    this.openDialog();
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (this.title) {
      calendarApi.addEvent({
        id: '1',
        title: this.title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  title: string = '';
  reason: string = '';

  constructor(public dialog: MatDialog) {
  }

  public openDialog() {
    const dialogRef = this.dialog.open(BuchungenDialogComponent, {
      data: {title: this.title, reason: this.reason},
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ', result);
      this.title = result;
    });

  }

  buttonNameToggle = true;
  buttonName: 'zeige Wochenenden an' | 'blende Wochenenden aus' = 'zeige Wochenenden an';

  showWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
    this.buttonName = this.buttonNameToggle ? 'zeige Wochenenden an' : 'blende Wochenenden aus';
  }
}
