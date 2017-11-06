import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {OfferFormConsts} from "../../../../utils/offer-form-consts";
import {FormUtils} from "../../../../utils/form-utils";

@Component({
  selector: 'app-description-step',
  templateUrl: './description-step.component.html',
  styleUrls: ['./description-step.component.scss']
})
export class DescriptionStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  maxLength: number = OfferFormConsts.MAX_DESC_LENGTH;
  checkInputLength = FormUtils.checkInputLength;

  constructor() { }

  ngOnInit() {
  }

}
