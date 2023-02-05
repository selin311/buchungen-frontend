import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendComponent } from './backend-component/backend.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { BuchungenSucheComponent } from './buchungen-suche/buchungen-suche.component';
import { HomeComponent } from './home/home.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { BuchungenDialogComponent } from './buchungen-dialog/buchungen-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {CdkDrag} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    BackendComponent,
    BuchungenSucheComponent,
    HomeComponent,
    FullcalendarComponent,
    BuchungenDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    MatDialogModule,
    CdkDrag
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
