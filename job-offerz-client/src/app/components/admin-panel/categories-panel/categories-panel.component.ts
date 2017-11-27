import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category";
import {SnackBarService} from "../../../shared/services/snack-bar.service";
import {Page} from "../../../models/pagination/page";
import {AbstractPanelPage} from "../../../shared/component-helpers/abstract-param-page";

@Component({
  selector: 'app-categories-panel',
  templateUrl: './categories-panel.component.html',
  styleUrls: ['./categories-panel.component.scss']
})
export class CategoriesPanelComponent extends AbstractPanelPage<Category> implements OnInit {

  constructor(private categoryService: CategoryService,
              private snackBarService: SnackBarService) {
    super('name');
    this.loadPage();
  }

  ngOnInit() {}

  loadPage() {
    this.loading = true;
    this.categoryService.getPage(this.pageRequest, this.filter).subscribe((categories: Page<Category>) => {
      this.params = categories;
      this.loading = false;
    }, err => {
      this.snackBarService.error(err);
      this.loading = false;
    });
  }

  onSubmit(category: Category) {
    if (this.mode === 'add') {
      this.categoryService.add(category).subscribe((category) => {
        this.snackBarService.success('Dodano kategorię');
        this.showForm = false;
        this.loadPage();
      },err => {
        this.snackBarService.error(err);
      });
    } else {
      //edit
      this.categoryService.update(category).subscribe((category) => {
        this.snackBarService.success('Zaktualizowano kategorię');
        this.showForm = false;
        this.loadPage();
      },err => {
        this.snackBarService.error(err);
      });
    }
  }

}
