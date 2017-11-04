import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {CompanyService} from "../../../../services/company.service";
import {Company} from "../../../../models/company";
import {Subscription} from "rxjs";
import {SnackBarService} from "../../../services/snack-bar.service";

@Component({
  selector: 'app-company-step',
  templateUrl: './company-step.component.html',
  styleUrls: ['./company-step.component.scss']
})
export class CompanyStepComponent implements OnInit, OnDestroy {

  companyAutoCompleteSub: Subscription;

  @Input('formGroup')
  formGroup: FormGroup;

  @Input('companyIdCtrl')
  companyIdCtrl: FormControl;

  filteredCompanies: Company[];
  showCompanyForm: boolean = false;
  newCompanyName: string;

  constructor(private companyService: CompanyService,
              private snackBarService: SnackBarService) {

  }

  ngOnInit() {
    this.companyAutoCompleteSub = this.companyIdCtrl.valueChanges
      .startWith(null)
      .subscribe((value) => {
        if (value && value !== '') {
          const name = value.name || value;
          this.companyService.getAllByName(name).subscribe((companies) => {
              this.filteredCompanies = companies;
          }, err => {
            this.snackBarService.error(err);
          });
        } else this.filteredCompanies = null;
      });
  }

  ngOnDestroy(): void {
    this.companyAutoCompleteSub.unsubscribe();
  }

  companyDisplayFn(value: any) {
    return value ? value.name : null;
  }

  showNewCompanyForm() {
    this.newCompanyName = this.companyIdCtrl.value ? (this.companyIdCtrl.value.name || this.companyIdCtrl.value) : '';
    this.showCompanyForm = true;
  }

  onAddCompany(company: Company) {
    this.companyIdCtrl.setValue(company);
    this.showCompanyForm = false;
  }

  onCancelAdd() {
    this.showCompanyForm = false;
    this.companyIdCtrl.setValue(null);
  }

}
