import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Category} from "../../../models/category";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-categories-selector',
  templateUrl: './categories-selector.component.html',
  styleUrls: ['./categories-selector.component.scss']
})
export class CategoriesSelectorComponent implements OnInit {

  categories: Category[] = [];

  @Output()
  categoryChange: EventEmitter<Category> = new EventEmitter<Category>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll(true).subscribe((categories) => {
        this.categories = [
          {_id: '-1', name: 'Wszystkie', active: true},
          ...categories
        ];
    })
  }

  selectedIndexChange(tabIndex: number) {
    this.categoryChange.next(this.categories[tabIndex]);
  }

}
