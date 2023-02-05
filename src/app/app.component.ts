import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BuchungenDialogComponent} from "./buchungen-dialog/buchungen-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Onlinereservierungssystem';

  //alles hier drunter kann wieder raus
  constructor(public dialog: MatDialog) {
  }

  public openTest() {
    const dialogRef = this.dialog.open(BuchungenDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
