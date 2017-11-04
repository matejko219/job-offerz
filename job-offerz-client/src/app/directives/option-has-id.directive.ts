import { Directive } from '@angular/core';
import {Validator, AbstractControl, ValidationErrors, ValidatorFn, NG_VALIDATORS} from "@angular/forms";

export const optionHasIdFactory = (c: AbstractControl) => {
  return (c.value && c.value._id) ? null : returnFalse();
};

const returnFalse = () => {
  return {
    optionHasId: {
      valid: false
    }
  };
};

@Directive({
  selector: '[optionHasId][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: OptionHasIdDirective, multi: true }
  ]
})
export class OptionHasIdDirective implements Validator {

  validator: ValidatorFn;

  constructor() {
    this.validator = optionHasIdFactory;
  }

  validate(c: AbstractControl): ValidationErrors|any {
    return this.validator(c);
  }

}
