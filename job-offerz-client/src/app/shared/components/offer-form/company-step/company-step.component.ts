import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {CompanyService} from "../../../../services/company.service";
import {Company} from "../../../../models/company";
import {Subscription} from "rxjs";
import {SnackBarService} from "../../../services/snack-bar.service";
import {optionHasIdFactory} from "../../../../directives/option-has-id.directive";

@Component({
  selector: 'app-company-step',
  templateUrl: './company-step.component.html',
  styleUrls: ['./company-step.component.scss']
})
export class CompanyStepComponent implements OnInit, OnDestroy {

  @Input('formGroup')
  formGroup: FormGroup;

  @Input()
  companyToEdit: Company;

  companyAutoCompleteSub: Subscription;
  companyAutoCtrl: FormControl;
  filteredCompanies: Company[];
  showCompanyForm: boolean = false;
  newCompanyName: string;

  constructor(private companyService: CompanyService,
              private snackBarService: SnackBarService) {

  }

  ngOnInit() {
    this.companyAutoCtrl = new FormControl('', Validators.compose([Validators.required, optionHasIdFactory]));

    this.companyAutoCompleteSub = this.companyAutoCtrl.valueChanges
      .startWith(null)
      .subscribe((value) => {
        this.patchCompanyValueToFormGroup(value);
        if (value && value !== '') {
          const name = value.name || value;

          this.companyService.getAll(name).subscribe((companies: Company[]) => {
              this.filteredCompanies = companies;
          }, err => {
            this.snackBarService.error(err);
          });
        } else this.filteredCompanies = null;
      });

    if (this.companyToEdit) {
      this.companyAutoCtrl.setValue(this.companyToEdit);
    }
  }

  ngOnDestroy(): void {
    this.companyAutoCompleteSub.unsubscribe();
  }

  companyDisplayFn(value: any) {
    return value ? value.name : null;
  }

  showNewCompanyForm() {
    this.newCompanyName = this.companyAutoCtrl.value ? (this.companyAutoCtrl.value.name || this.companyAutoCtrl.value) : '';
    this.showCompanyForm = true;
  }

  onAddCompany(company: Company) {
    this.companyAutoCtrl.setValue(company);
    this.showCompanyForm = false;
  }

  onCancelAdd() {
    this.showCompanyForm = false;
    this.companyAutoCtrl.setValue(null);
  }

  patchCompanyValueToFormGroup(value) {
    if (this.companyAutoCtrl.valid) {
      this.formGroup.patchValue({company: value});
    } else this.formGroup.patchValue({company: null});
  }

  clearAutoComp() {
    this.companyAutoCtrl.setValue(null);
  }

}
