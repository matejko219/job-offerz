import {Component, OnInit, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl} from "@angular/forms";

export function createStarRateValidator(minValue) {
  return function validateStarRate(c: FormControl) {
    const err = {
      rateError: {
        given: c.value,
        min: minValue
      }
    };

    return (c.value < +minValue) ? err: null;
  }
}

@Component({
  selector: 'app-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRateComponent),
      multi: true
    }
  ]
})
export class StarRateComponent implements OnInit, ControlValueAccessor {

  @Input('value')
  _value = 1;

  @Input()
  disabled = false;

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
    this.propagateChange(value);
  }

  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  changeValue(value: number) {
    if (!this.disabled) this.value = value;
  }

  writeValue(value: number): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

}
