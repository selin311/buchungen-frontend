import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BuchungenSucheComponent} from "./buchungen-suche/buchungen-suche.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: 'buchungen-suche', component: BuchungenSucheComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
