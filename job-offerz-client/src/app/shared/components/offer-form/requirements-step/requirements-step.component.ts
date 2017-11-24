import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {FormGroup, Validators, FormArray, FormBuilder} from "@angular/forms";
import {OfferFormConsts} from "../../../../utils/offer-form-consts";
import {SnackBarService} from "../../../services/snack-bar.service";
import {FormUtils} from "../../../../utils/form-utils";
import {createStarRateValidator} from "../../star-rate/star-rate.component";
import {Requirement} from "../../../../models/requirement";

@Component({
  selector: 'app-requirements-step',
  templateUrl: './requirements-step.component.html',
  styleUrls: ['./requirements-step.component.scss']
})
export class RequirementsStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  @Input()
  requirementsToEdit: Requirement[];

  formArray: FormArray;

  nameMaxLength = OfferFormConsts.MAX_REQ_NAME_LENGTH;
  checkInputLength = FormUtils.checkInputLength;
  minStarsRate = 1;

  constructor(private formBuilder: FormBuilder,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.formArray = this.getArrayControl();
    if (this.requirementsToEdit) {
      this.requirementsToEdit.forEach(req => {
        this.addRequirement(req.name, req.rate);
      });
    }
  }

  addRequirement(name?: string, rate?: number) {
    if (this.formArray.length < OfferFormConsts.MAX_REQ_ITEMS) {
      this.formArray.push(
        this.formBuilder.group({
          name: [name || '', Validators.compose([Validators.required, Validators.maxLength(OfferFormConsts.MAX_REQ_NAME_LENGTH)])],
          rate: [rate || 1, Validators.compose([Validators.required, createStarRateValidator(this.minStarsRate)])]
        })
      );
    } else {
      this.snackBarService.error(`Maksymalna liczba umiejętności to ${OfferFormConsts.MAX_REQ_ITEMS}`);
    }
  }

  removeRequirement(index: number) {
    this.formArray.removeAt(index);
  }

  private getArrayControl(): FormArray {
    return <FormArray>this.formGroup.controls['requirements'];
  }

}
