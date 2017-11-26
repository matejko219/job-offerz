import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category";
import {SnackBarService} from "../../../shared/services/snack-bar.service";
import {PageRequest} from "../../../models/pagination/page-request";
import {Page} from "../../../models/pagination/page";
import {AbstractPage} from "../../../shared/component-helpers/abstract-page";

@Component({
  selector: 'app-categories-panel',
  templateUrl: './categories-panel.component.html',
  styleUrls: ['./categories-panel.component.scss']
})
export class CategoriesPanelComponent extends AbstractPage implements OnInit {

  categories: Page<Category>;
  showForm: boolean = false;
  categoryToEdit: Category = new Category();
  mode: 'add' | 'edit' = 'add';

  constructor(private categoryService: CategoryService,
              private snackBarService: SnackBarService) {
    super('name');
    this.loadPage();
  }

  ngOnInit() {}

  loadPage() {
    this.loading = true;
    this.categoryService.getPage(this.pageRequest, this.filter).subscribe((categories: Page<Category>) => {
      this.categories = categories;
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
    this.categoryToEdit = new Category();
    this.mode = 'add';
    this.showForm = true;
  }

  onEditClick(category: Category) {
    this.categoryToEdit = category;
    this.mode = 'edit';
    this.showForm = true;
  }

  onSubmitCategory(category: Category) {
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
