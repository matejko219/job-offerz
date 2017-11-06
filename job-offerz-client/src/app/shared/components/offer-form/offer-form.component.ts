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

  basicInfoFormGroup: FormGroup;
  companyFormGroup: FormGroup;
  descriptionFormGroup: FormGroup;
  termsBonusesFormGroup: FormGroup;
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

    this.termsBonusesFormGroup = this.formBuilder.group({
      formOfEmployment: ['', Validators.required],
      jobTime: ['', Validators.required],
      salary: ['', Validators.required],
    });

    this.contactFormGroup = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, validPhoneFactory])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      www: ['', Validators.compose([Validators.required, validUrlFactory])]
    });
  }

}
