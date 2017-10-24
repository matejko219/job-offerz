import {Directive} from '@angular/core';
import {AbstractControl, Validator, ValidationErrors, ValidatorFn, NG_VALIDATORS} from "@angular/forms";

const matchPasswordFactory = (c: AbstractControl) => {
  const passwdCtrl = c.parent.get('password');
  if (!passwdCtrl) {
    console.log('matchPasswordFactory: can\'t find password form control');
    return returnFalse();
  } else {
    const isValid = c.value === passwdCtrl.value;
    return isValid ? null : returnFalse();
  }
};

const returnFalse = () => {
  return {
    matchPassword: {
      valid: false
    }
  };
};

@Directive({
  selector: '[matchPassword][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true }
  ]
})
export class MatchPasswordDirective implements Validator{

  validator: ValidatorFn;

  constructor() {
    this.validator = matchPasswordFactory;
  }

  validate(c: AbstractControl): ValidationErrors|any {
    return this.validator(c);
  }

}
