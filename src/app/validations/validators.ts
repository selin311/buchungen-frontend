import {ValidatorFn} from "@angular/forms";

export function buchungsFormValidator(starttime: string, endtime: string): ValidatorFn {
  return function (buchungForm) {
    let starttimeValue = buchungForm.get(starttime)!.value;
    let endtimeValue = buchungForm.get(endtime)!.value;

    if (parseInt(starttimeValue) > parseInt(endtimeValue)) {
      return { 'starttimeIsBeforeEndtime': true }
    }
    return null;
  }
}
