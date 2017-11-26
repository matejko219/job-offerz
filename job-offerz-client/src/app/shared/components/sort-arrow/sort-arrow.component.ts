import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {PageRequest} from "../../../models/pagination/page-request";

@Component({
  selector: 'app-sort-arrow',
  templateUrl: './sort-arrow.component.html',
  styleUrls: ['./sort-arrow.component.scss']
})
export class SortArrowComponent implements OnInit {

  @Input()
  name: string;

  @Input()
  pageRequest: PageRequest;

  @Output()
  sortChange: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  changeSort() {
    if (this.pageRequest.sortField === this.name) {
      this.pageRequest.sortDir = this.pageRequest.sortDir === 1 ? -1 : 1;
    } else {
      this.pageRequest.sortField = this.name;
      this.pageRequest.sortDir = 1;
    }

    this.sortChange.next();
  }

}
