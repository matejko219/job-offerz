import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from "@angular/forms";
import {optionHasIdFactory} from "../../../directives/option-has-id.directive";

@Component({
  selector: 'app-offer-form',
  templateUrl: 'offer-form.component.html',
  styleUrls: ['offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {

  basicInfoFormGroup: FormGroup;
  companyFormGroup: FormGroup;
  descriptionFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.basicInfoFormGroup = this.formBuilder.group({
      titleCtrl: ['', Validators.required],
      categoryCtrl: ['', Validators.required],
      locationCtrl: ['', Validators.required]
    });

    this.companyFormGroup = this.formBuilder.group({
      companyCtrl: ['', Validators.required]
    });

    this.descriptionFormGroup = this.formBuilder.group({
      descCtrl: ['', Validators.required]
    });
  }

}
