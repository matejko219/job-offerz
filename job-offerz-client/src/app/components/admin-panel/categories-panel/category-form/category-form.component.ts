import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Category} from "../../../../models/category";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  _category: Category = new Category();

  @Input()
  set category(category: Category) {
    this._category = {...category};
  }

  get category() {
    return this._category;
  }

  @Input()
  mode: 'add' | 'edit' = 'add';

  @Output('cancel')
  cancelEvent: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  submitEvent: EventEmitter<Category> = new EventEmitter<Category>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitEvent.next(this.category);
  }

  cancel() {
    this.category = new Category();
    this.cancelEvent.next();
  }

}
