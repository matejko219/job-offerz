import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-description-step',
  templateUrl: './description-step.component.html',
  styleUrls: ['./description-step.component.scss']
})
export class DescriptionStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  @Input('maxLength')
  maxLength: number = 500;

  constructor() { }

  ngOnInit() {
  }

  checkInputLength(event) {
    if (event.which < 0x20) return;
    if (event.target.value.length == this.maxLength) {
      event.preventDefault();
    } else if (event.target.value.length > this.maxLength) {
      event.target.value = event.target.value.substring(0, this.maxLength);
    }
  }

}
