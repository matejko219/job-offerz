import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-basic-filter',
  templateUrl: './basic-filter.component.html',
  styleUrls: ['./basic-filter.component.scss']
})
export class BasicFilterComponent implements OnInit {

  query: string = '';

  @Input()
  placeholder: string = '';

  @Output()
  filterEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onFiltersSubmit() {
    this.filterEvent.next(this.query);
  }

  clearFilter() {
    this.query = '';
    this.onFiltersSubmit();
  }

}
