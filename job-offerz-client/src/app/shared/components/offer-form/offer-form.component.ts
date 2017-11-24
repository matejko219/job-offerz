import {Component, OnInit, EventEmitter, Output, Input, AfterViewInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {OfferFormConsts} from "../../../utils/offer-form-consts";
import {validPhoneFactory} from "../../../directives/valid-phone.directive";
import {validUrlFactory} from "../../../directives/valid-url.directive";
import {Offer} from "../../../models/offer";
import {OfferDetails} from "../../../models/offer-details";

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

  @Input()
  offerToEdit: Offer;

  @Output()
  onSubmit: EventEmitter<Offer> = new EventEmitter<Offer>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.basicInfoFormGroup = this.formBuilder.group({
      position: ['', Validators.compose([Validators.required, Validators.maxLength(OfferFormConsts.MAX_POSITION_LENGTH)])],
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
      terms: this.formBuilder.group({
        formOfEmployment: ['Umowa o pracę', Validators.required],
        jobTime: ['100', Validators.required],
        salary: this.formBuilder.group({
          amount: ['0', Validators.compose([Validators.required, Validators.min(0)])],
          currency: ['PLN', Validators.required],
          type: ['brutto', Validators.required],
          period: ['miesiąc', Validators.required]
        })
      })
    });

    this.bonusesFormGroup = this.formBuilder.group({
      bonuses: this.formBuilder.array([])
    });

    this.contactFormGroup = this.formBuilder.group({
      contactDetails: this.formBuilder.group({
        phone: ['', Validators.compose([Validators.required, validPhoneFactory])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        www: ['', Validators.compose([validUrlFactory])]
      })
    });

    this.formGroupsWrapper = this.formBuilder.group({
      basicInfo: this.basicInfoFormGroup,
      company: this.companyFormGroup,
      description: this.descriptionFormGroup,
      requirements: this.requirementsFormGroup,
      terms: this.termsFormGroup,
      bonuses: this.bonusesFormGroup,
      contactDetails: this.contactFormGroup,
    });

    if (this.offerToEdit) {
      this.patchOfferToForm();
    }
  }

  submit() {
    const offerDetails: OfferDetails = {
      ...this.descriptionFormGroup.getRawValue(),
      ...this.requirementsFormGroup.getRawValue(),
      ...this.termsFormGroup.getRawValue(),
      ...this.bonusesFormGroup.getRawValue(),
      ...this.contactFormGroup.getRawValue()
    };

    const offer: Offer = {
      ...this.basicInfoFormGroup.getRawValue(),
      ...this.companyFormGroup.getRawValue(),
      offerDetails
    };

    this.onSubmit.next(offer);
  }

  patchOfferToForm() {
    this.basicInfoFormGroup.patchValue(this.offerToEdit);
    this.companyFormGroup.patchValue(this.offerToEdit);
    this.descriptionFormGroup.patchValue(this.offerToEdit.offerDetails);
    this.termsFormGroup.patchValue(this.offerToEdit.offerDetails);
    this.contactFormGroup.patchValue(this.offerToEdit.offerDetails);
  }

}
