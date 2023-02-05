import { Component } from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import deLocale from '@fullcalendar/core/locales/de';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {MatDialog} from "@angular/material/dialog";
import {BuchungenDialogComponent} from "../buchungen-dialog/buchungen-dialog.component";
import {DateSelectArg} from "fullcalendar";

@Component({
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.css']
})

export class FullcalendarComponent {

  Events: any[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
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

    dateClick: this.openDialog.bind(this),
    // select: this.handleDateSelect.bind(this),
  };

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const reason = prompt('enter reason')
    const calendarApi = selectInfo.view.calendar;
  }

  constructor(public dialog: MatDialog) {
  }

  public openDialog() {
    const dialogRef = this.dialog.open(BuchungenDialogComponent)

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  buttonNameToggle = true;
  buttonName: 'zeige Wochenenden an' | 'blende Wochenenden aus' = 'zeige Wochenenden an';

  showWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
    this.buttonName = this.buttonNameToggle ? 'zeige Wochenenden an' : 'blende Wochenenden aus';
  }
}
