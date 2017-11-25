import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Category} from "../../../../models/category";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  @Input()
  category: Category = new Category();

  @Output('cancel')
  cancelEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }

  cancelAdd() {
    this.category = new Category();
    this.cancelEvent.next();
  }

}
