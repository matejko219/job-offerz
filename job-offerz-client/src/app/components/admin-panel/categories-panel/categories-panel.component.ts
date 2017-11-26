import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category";
import {SnackBarService} from "../../../shared/services/snack-bar.service";

@Component({
  selector: 'app-categories-panel',
  templateUrl: './categories-panel.component.html',
  styleUrls: ['./categories-panel.component.scss']
})
export class CategoriesPanelComponent implements OnInit {

  categories: Category[];
  showForm: boolean = false;
  categoryToEdit: Category = new Category();
  mode: 'add' | 'edit' = 'add';

  constructor(private categoryService: CategoryService,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
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
        this.loadCategories();
      },err => {
        this.snackBarService.error(err);
      });
    } else {
      //edit
      this.categoryService.update(category).subscribe((category) => {
        this.snackBarService.success('Zaktualizowano kategorię');
        this.showForm = false;
        this.loadCategories();
      },err => {
        this.snackBarService.error(err);
      });
    }
  }

}
