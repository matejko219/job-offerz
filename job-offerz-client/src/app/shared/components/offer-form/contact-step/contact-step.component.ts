import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-contact-step',
  templateUrl: './contact-step.component.html',
  styleUrls: ['./contact-step.component.scss']
})
export class ContactStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
