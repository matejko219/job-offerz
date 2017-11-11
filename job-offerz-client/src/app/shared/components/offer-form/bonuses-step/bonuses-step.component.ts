import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {OfferFormConsts} from "../../../../utils/offer-form-consts";
import {FormUtils} from "../../../../utils/form-utils";

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  addBonus() {
    const control = this.getBonusesArrayControl();
    control.push(
      this.formBuilder.group({
        description: ['', Validators.compose([Validators.required, Validators.maxLength(OfferFormConsts.MAX_BONUS_DESC_LENGTH)])]
      })
    );
  }

  removeBonus(index: number) {
    const control = this.getBonusesArrayControl();
    control.removeAt(index);
  }

  private getBonusesArrayControl(): FormArray {
    return <FormArray>this.formGroup.controls['bonuses'];
  }

}
