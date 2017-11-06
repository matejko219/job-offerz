import { Directive } from '@angular/core';
import {Validator, ValidatorFn, AbstractControl, ValidationErrors, NG_VALIDATORS} from "@angular/forms";

export const validPhoneFactory = (c: AbstractControl) => {
  const value = c.value;
  if (!value) return returnFalse();
  if (isNaN(value)) return returnFalse();
  if (value.startsWith('-')) return returnFalse();
  if (value.startsWith('00') && value.length === 13) return null;
  if (value.startsWith('+') && value.length === 12) return null;
  if (value.length === 9) return null;

  return returnFalse();
};

const returnFalse = () => {
  return {
    validPhone: {
      valid: false
    }
  };
};

@Directive({
  selector: '[validPhone][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ValidPhoneDirective, multi: true }
  ]
})
export class ValidPhoneDirective implements Validator {

  validator: ValidatorFn;

  constructor() {
    this.validator = validPhoneFactory;
  }

  validate(c: AbstractControl): ValidationErrors|any {
    return this.validator(c);
  }

}
