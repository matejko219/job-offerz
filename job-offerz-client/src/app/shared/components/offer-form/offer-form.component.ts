import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-offer-form',
  templateUrl: 'offer-form.component.html',
  styleUrls: ['offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {

  form =  {
    title: '',
    description: ''
  };

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  categories = ['Frontend', 'Backend'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      titleCtrl: ['', Validators.required],
      categoryCtrl: ['', Validators.required],
      locationCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      descCtrl: ['', Validators.required]
    });
  }

  onSubmit() {

  }
}
