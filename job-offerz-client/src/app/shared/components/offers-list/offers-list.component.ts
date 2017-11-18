import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Offer} from "../../../models/offer";
import {Page} from "../../../models/pagination/page";
import {PageRequest} from "../../../models/pagination/page-request";

@Component({
  selector: 'app-offers-list',
  templateUrl: 'offers-list.component.html',
  styleUrls: ['offers-list.component.scss']
})
export class OffersListComponent implements OnInit {

  @Input('offers')
  offers: Page<Offer>;

  @Input('editEnabled')
  editEnabled: boolean = false;

  @Input('favEnabled')
  favEnabled: boolean = false;

  @Output()
  pageChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();

  constructor() { }

  ngOnInit() {
  }

  setPage({pageSize, pageIndex}) {
    const pageRequest = new PageRequest();
    pageRequest.limit = pageSize;
    pageRequest.page = pageIndex + 1;
    this.pageChange.next(pageRequest);
  }

}
