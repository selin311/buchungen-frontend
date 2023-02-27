import {FormControl, FormGroupDirective, NgForm, ValidatorFn} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

export class UntouchedErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    return control && control.invalid;
  }
}

export function buchungsFormValidator(starttime: string, endtime: string): ValidatorFn {
  return function (buchungForm) {
    let starttimeValue = buchungForm.get(starttime)!.value;
    let endtimeValue = buchungForm.get(endtime)!.value;

    if (parseInt(starttimeValue) >= parseInt(endtimeValue)) {
      return { 'starttimeIsBeforeEndtime': true }
    }
    return null;
  }
}
