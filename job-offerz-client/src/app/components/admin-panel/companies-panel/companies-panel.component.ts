import { Component, OnInit } from '@angular/core';
import {AbstractPage} from "../../../shared/component-helpers/abstract-page";
import {Page} from "../../../models/pagination/page";
import {SnackBarService} from "../../../shared/services/snack-bar.service";
import {Company} from "../../../models/company";
import {CompanyService} from "../../../services/company.service";

@Component({
  selector: 'app-companies-panel',
  templateUrl: './companies-panel.component.html',
  styleUrls: ['./companies-panel.component.scss']
})
export class CompaniesPanelComponent extends AbstractPage implements OnInit {

  companies: Page<Company>;
  showForm: boolean = false;
  companyToEdit: Company;
  mode: 'add' | 'edit' = 'add';

  constructor(private companyService: CompanyService,
              private snackBarService: SnackBarService) {
    super('name');
    this.loadPage();
  }

  ngOnInit() {}

  loadPage() {
    this.loading = true;
    this.companyService.getPage(this.pageRequest, this.filter).subscribe((companies: Page<Company>) => {
      this.companies = companies;
      this.loading = false;
    }, err => {
      this.snackBarService.error(err);
      this.loading = false;
    });
  }

  onCancelAdd() {
    this.showForm = false;
  }

  onAddNewClick() {
    this.companyToEdit = null;
    this.mode = 'add';
    this.showForm = true;
  }

  onEditClick(company: Company) {
    this.companyToEdit = company;
    this.mode = 'edit';
    this.showForm = true;
  }

  onSubmit(company: Company) {
    this.showForm = false;
    this.loadPage();
  }

}
