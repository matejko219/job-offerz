import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, Validators, FormArray, FormBuilder} from "@angular/forms";
import {OfferFormConsts} from "../../../../utils/offer-form-consts";
import {SnackBarService} from "../../../services/snack-bar.service";
import {FormUtils} from "../../../../utils/form-utils";
import {createStarRateValidator} from "../../star-rate/star-rate.component";

@Component({
  selector: 'app-requirements-step',
  templateUrl: './requirements-step.component.html',
  styleUrls: ['./requirements-step.component.scss']
})
export class RequirementsStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  nameMaxLength = OfferFormConsts.MAX_REQ_NAME_LENGTH;
  checkInputLength = FormUtils.checkInputLength;

  constructor(private formBuilder: FormBuilder,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
  }

  addRequirement() {
    const control = this.getArrayControl();
    if (control.length < OfferFormConsts.MAX_REQ_ITEMS) {
      control.push(
        this.formBuilder.group({
          name: ['', Validators.compose([Validators.required, Validators.maxLength(OfferFormConsts.MAX_REQ_NAME_LENGTH)])],
          rate: [1, Validators.compose([Validators.required, createStarRateValidator(1)])]
        })
      );
    } else {
      this.snackBarService.error(`Maksymalna liczba umiejętności to ${OfferFormConsts.MAX_REQ_ITEMS}`);
    }
  }

  removeRequirement(index: number) {
    const control = this.getArrayControl();
    control.removeAt(index);
  }

  private getArrayControl(): FormArray {
    return <FormArray>this.formGroup.controls['requirements'];
  }

}
