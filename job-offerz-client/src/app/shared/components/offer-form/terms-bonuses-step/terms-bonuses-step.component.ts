import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-terms-bonuses-step',
  templateUrl: './terms-bonuses-step.component.html',
  styleUrls: ['./terms-bonuses-step.component.scss']
})
export class TermsBonusesStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  formOfEmployment = ['Umowa o pracę', 'Umowa zlecenie', 'Umowa o dzieło', 'B2B', 'Praktyka', 'Staż'];
  currencies = ['PLN', 'USD', 'EUR', 'GBP'];
  salaryTypes = ['brutto', 'netto'];
  periods = ['miesiąc', 'tydzień', 'dzień', 'godzina'];

  salary = {
    amount: 0,
    currency: 'PLN',
    type: 'brutto',
    period: 'miesiąc'
  }

  constructor() { }

  ngOnInit() {
    this.formGroup.patchValue({
      formOfEmployment: this.formOfEmployment[0],
      jobTime: '100',
      salary: this.salary
    });
  }

}
