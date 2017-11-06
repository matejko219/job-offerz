import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-terms-bonuses-step',
  templateUrl: './terms-bonuses-step.component.html',
  styleUrls: ['./terms-bonuses-step.component.scss']
})
export class TermsBonusesStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
