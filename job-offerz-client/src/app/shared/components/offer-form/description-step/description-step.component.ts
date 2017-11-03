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

  constructor() { }

  ngOnInit() {
  }

}
