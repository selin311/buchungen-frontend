import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from "../fullcalendar/fullcalendar.component";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {BackendService} from "../backend-service/backend-service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Buchung} from "../model/model";

@Component({
  selector: 'app-buchungen-dialog',
  templateUrl: './buchungen-dialog.component.html',
  styleUrls: ['./buchungen-dialog.component.css']
})
export class BuchungenDialogComponent implements OnInit {

  checked = false;
  isUpdate = false;
  formerStarttime: string = '';
  formerEndtime: string = '';
  buchungForm = new FormGroup({
    date: new FormControl(this.data.date),
    username: new FormControl(this.data.username,Validators.required),
    starttime: new FormControl(this.data.starttime),
    endtime: new FormControl(this.data.endtime),
    reason: new FormControl(this.data.reason),
    allDay: new FormControl(this.data.allDay)
  });

  constructor(
    public dialogRef: MatDialogRef<BuchungenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public backendService: BackendService
  ) {}

  public ngOnInit() {
    if (this.data.username) {
      this.isUpdate = true;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  saveBuchung() {
    const buchung = {
      username: this.buchungForm.controls['username'].value,
      date: this.buchungForm.controls['date'].value,
      starttime: this.buchungForm.controls['starttime'].value,
      endtime: this.buchungForm.controls['endtime'].value,
      reason: this.buchungForm.controls['reason'].value,
      allDay: this.buchungForm.controls['allDay'].value
    }
    this.backendService.saveBuchung(buchung).subscribe(
      (response) => {
        this.dialogRef.close(response);
        },
      (error) => {
        console.log(error);
      });
  }

  updateBuchung() {
    const buchung = {
      id: this.data.id,
      username: this.buchungForm.controls['username'].value,
      date: this.buchungForm.controls['date'].value,
      starttime: this.buchungForm.controls['starttime'].value,
      endtime: this.buchungForm.controls['endtime'].value,
      reason: this.buchungForm.controls['reason'].value,
      allDay: this.buchungForm.controls['allDay'].value
    }
    this.backendService.updateBuchung(buchung).subscribe(
      (response) => {
        this.dialogRef.close({
          id: this.data.id,
          username: this.buchungForm.controls['username'].value,
          date: this.buchungForm.controls['date'].value,
          starttime: this.buchungForm.controls['starttime'].value,
          endtime: this.buchungForm.controls['endtime'].value,
          reason: this.buchungForm.controls['reason'].value,
          allDay: this.buchungForm.controls['allDay'].value,
          delete: false
        });
      },
      (error) => {
        console.log(error);
      });
  }

  public deleteBuchung() {
    this.backendService.deleteBuchung(this.data.id).subscribe(
      () => {
        this.dialogRef.close({
          id: this.data.id,
          delete: true
        });
      },
      () => {
        console.log("ERROR!");
      })
  }

  allDayChange(event: MatSlideToggleChange) {
    this.formerStarttime = this.data.starttime;
    this.formerEndtime = this.data.endtime;
    if (event.checked) {
      this.buchungForm.controls['allDay'].setValue(true);
      this.buchungForm.controls['starttime'].setValue('00:00');
      this.buchungForm.controls['endtime'].setValue('23:59');
      document.getElementById("startzeitInput")!.style.visibility = "hidden";
      document.getElementById("endzeitInput")!.style.visibility = "hidden";
    }
    else {
      this.buchungForm.controls['allDay'].setValue(false);
      this.buchungForm.controls['starttime'].setValue(this.formerStarttime);
      this.buchungForm.controls['endtime'].setValue(this.formerEndtime);
      document.getElementById("startzeitInput")!.style.visibility = "visible";
      document.getElementById("endzeitInput")!.style.visibility = "visible";
    }
  }

}

