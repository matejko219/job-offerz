import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-offer-form',
  templateUrl: 'offer-form.component.html',
  styleUrls: ['offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {

  basicInfoFormGroup: FormGroup;
  companyFormGroup: FormGroup;
  descriptionFormGroup: FormGroup;
  contactFormGroup: FormGroup;

  maxDescLength = 500;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.basicInfoFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required]
    });

    this.companyFormGroup = this.formBuilder.group({
      company: ['', Validators.required]
    });

    this.descriptionFormGroup = this.formBuilder.group({
      description: ['', Validators.compose([Validators.required, Validators.maxLength(this.maxDescLength)])]
    });

    this.contactFormGroup = this.formBuilder.group({
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      www: ['', Validators.required]
    });
  }

}
