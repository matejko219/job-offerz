import { Component, OnInit } from '@angular/core';
import {AbstractPanelPage} from "../../../shared/component-helpers/abstract-param-page";
import {Page} from "../../../models/pagination/page";
import {SnackBarService} from "../../../shared/services/snack-bar.service";
import {Company} from "../../../models/company";
import {CompanyService} from "../../../services/company.service";

@Component({
  selector: 'app-companies-panel',
  templateUrl: './companies-panel.component.html',
  styleUrls: ['./companies-panel.component.scss']
})
export class CompaniesPanelComponent extends AbstractPanelPage<Company> implements OnInit {

  constructor(private companyService: CompanyService,
              private snackBarService: SnackBarService) {
    super('name');
    this.loadPage();
  }

  ngOnInit() {}

  loadPage() {
    this.loading = true;
    this.companyService.getPage(this.pageRequest, this.filter).subscribe((companies: Page<Company>) => {
      this.params = companies;
      this.loading = false;
    }, err => {
      this.snackBarService.error(err);
      this.loading = false;
    });
  }

}
