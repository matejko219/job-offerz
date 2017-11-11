import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {OfferFormConsts} from "../../../../utils/offer-form-consts";
import {FormUtils} from "../../../../utils/form-utils";
import {SnackBarService} from "../../../services/snack-bar.service";

@Component({
  selector: 'app-bonuses-step',
  templateUrl: './bonuses-step.component.html',
  styleUrls: ['./bonuses-step.component.scss']
})
export class BonusesStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  descMaxLength = OfferFormConsts.MAX_BONUS_DESC_LENGTH;
  checkInputLength = FormUtils.checkInputLength;

  constructor(private formBuilder: FormBuilder,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
  }

  addBonus() {
    const control = this.getArrayControl();
    if (control.length < OfferFormConsts.MAX_BONUS_ITEMS) {
      control.push(
        this.formBuilder.group({
          description: ['', Validators.compose([Validators.required, Validators.maxLength(OfferFormConsts.MAX_BONUS_DESC_LENGTH)])]
        })
      );
    } else {
      this.snackBarService.error(`Maksymalna liczba dodatków to ${OfferFormConsts.MAX_BONUS_ITEMS}`);
    }
  }

  removeBonus(index: number) {
    const control = this.getArrayControl();
    control.removeAt(index);
  }

  private getArrayControl(): FormArray {
    return <FormArray>this.formGroup.controls['bonuses'];
  }

}