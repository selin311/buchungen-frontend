import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from "../fullcalendar/fullcalendar.component";

@Component({
  selector: 'app-buchungen-dialog',
  templateUrl: './buchungen-dialog.component.html',
  styleUrls: ['./buchungen-dialog.component.css']
})
export class BuchungenDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BuchungenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
