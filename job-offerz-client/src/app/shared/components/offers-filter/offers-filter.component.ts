import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {OfferFilters} from "../../../models/filters/offer-filters";
import {MatSlideToggleChange} from "@angular/material";

@Component({
  selector: 'app-offers-filter',
  templateUrl: 'offers-filter.component.html',
  styleUrls: ['offers-filter.component.scss']
})
export class OffersFilterComponent implements OnInit {

  filters: OfferFilters;

  @Output()
  filtersChange: EventEmitter<OfferFilters> = new EventEmitter<OfferFilters>();

  @Output()
  sortDirChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.filters = new OfferFilters();
  }

  onFiltersSubmit() {
    this.filtersChange.next(this.filters);
  }

  onSortDirChange(event: MatSlideToggleChange) {
    const dir = event.checked ? -1 : 1;
    this.sortDirChange.next(dir);
  }

}
