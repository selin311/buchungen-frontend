import {ValidatorFn} from "@angular/forms";

export function isStarttimeBeforeEndtimeValidator(field1: string, field2: string): ValidatorFn {
  return function (buchungForm) {
    let field1Value = buchungForm.get(field1)!.value;
    let field2Value = buchungForm.get(field2)!.value;

    if (field1Value !== field2Value) {
      return { 'starttimeIsBeforeEndtime': 'Starttime is not before endtime.' }
    }
    return null;
  }
}
