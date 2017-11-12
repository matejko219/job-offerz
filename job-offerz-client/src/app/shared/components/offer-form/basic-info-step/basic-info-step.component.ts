import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {OfferFormConsts} from "../../../../utils/offer-form-consts";
import {FormUtils} from "../../../../utils/form-utils";
import {Category} from "../../../../models/category";

@Component({
  selector: 'app-basic-info-step',
  templateUrl: './basic-info-step.component.html',
  styleUrls: ['./basic-info-step.component.scss']
})
export class BasicInfoStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  categories: Category[] = [
    {_id: '1', name: 'Frontend'},
    {_id: '2', name: 'Backend'}
  ];

  positionMaxLength = OfferFormConsts.MAX_POSITION_LENGTH;
  locationMaxLength = OfferFormConsts.MAX_LOCATION_LENGTH;
  checkInputLength = FormUtils.checkInputLength;

  constructor() { }

  ngOnInit() {
  }

}
