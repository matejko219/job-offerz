import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category";

@Component({
  selector: 'app-categories-panel',
  templateUrl: './categories-panel.component.html',
  styleUrls: ['./categories-panel.component.scss']
})
export class CategoriesPanelComponent implements OnInit {

  categories: Category[];
  showForm: boolean = false;
  categoryToEdit: Category = new Category();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  onCancelAdd() {
    this.showForm = false;
  }

  onAddNewClick() {
    this.categoryToEdit = new Category();
    this.showForm = true;
  }

  onEditClick(category: Category) {
    this.categoryToEdit = category;
    this.showForm = true;
  }

}
