import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {OfferFormConsts} from "../../../utils/offer-form-consts";
import {validPhoneFactory} from "../../../directives/valid-phone.directive";
import {validUrlFactory} from "../../../directives/valid-url.directive";

@Component({
  selector: 'app-offer-form',
  templateUrl: 'offer-form.component.html',
  styleUrls: ['offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {

  formGroupsWrapper: FormGroup;
  basicInfoFormGroup: FormGroup;
  companyFormGroup: FormGroup;
  descriptionFormGroup: FormGroup;
  requirementsFormGroup: FormGroup;
  termsFormGroup: FormGroup;
  bonusesFormGroup: FormGroup;
  contactFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.basicInfoFormGroup = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(OfferFormConsts.MAX_TITLE_LENGTH)])],
      category: ['', Validators.required],
      location: ['', Validators.compose([Validators.required, Validators.maxLength(OfferFormConsts.MAX_LOCATION_LENGTH)])]
    });

    this.companyFormGroup = this.formBuilder.group({
      company: ['', Validators.required]
    });

    this.descriptionFormGroup = this.formBuilder.group({
      description: ['', Validators.compose([Validators.required, Validators.maxLength(OfferFormConsts.MAX_DESC_LENGTH)])]
    });

    this.requirementsFormGroup = this.formBuilder.group({
      requirements: this.formBuilder.array([])
    });

    this.termsFormGroup = this.formBuilder.group({
      formOfEmployment: ['', Validators.required],
      jobTime: ['', Validators.required],
      salary: this.formBuilder.group({
        amount: ['', Validators.required],
        currency: ['', Validators.required],
        type: ['', Validators.required],
        period: ['', Validators.required]
      })
    });

    this.bonusesFormGroup = this.formBuilder.group({
      bonuses: this.formBuilder.array([])
    });

    this.contactFormGroup = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, validPhoneFactory])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      www: ['', Validators.compose([validUrlFactory])]
    });

    this.formGroupsWrapper = this.formBuilder.group({
      basicInfo: this.basicInfoFormGroup,
      company: this.companyFormGroup,
      description: this.descriptionFormGroup,
      requirements: this.requirementsFormGroup,
      terms: this.termsFormGroup,
      bonuses: this.bonusesFormGroup,
      contact: this.contactFormGroup,
    });
  }

}
