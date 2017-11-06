import { Directive } from '@angular/core';
import {NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors} from "@angular/forms";

export const validUrlFactory = (c: AbstractControl) => {
  const value = c.value;
  if (!value) return returnFalse();

  const urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(urlExpression);

  return regex.test(value) ? null : returnFalse();
};

const returnFalse = () => {
  return {
    validUrl: {
      valid: false
    }
  };
};

@Directive({
  selector: '[validUrl][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ValidUrlDirective, multi: true }
  ]
})
export class ValidUrlDirective implements Validator {

  validator: ValidatorFn;

  constructor() {
    this.validator = validUrlFactory;
  }

  validate(c: AbstractControl): ValidationErrors|any {
    return this.validator(c);
  }

}
