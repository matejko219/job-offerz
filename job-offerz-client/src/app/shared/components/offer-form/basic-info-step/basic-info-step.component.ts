import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-basic-info-step',
  templateUrl: './basic-info-step.component.html',
  styleUrls: ['./basic-info-step.component.scss']
})
export class BasicInfoStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  categories = ['Frontend', 'Backend'];

  constructor() { }

  ngOnInit() {
  }

}
