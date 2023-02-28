import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FullcalendarComponent} from "./fullcalendar/fullcalendar.component";

const routes: Routes = [
  { path: 'home', component: FullcalendarComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
