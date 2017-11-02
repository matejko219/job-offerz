import {Component, OnInit, Input} from '@angular/core';
import {Offer} from "../../../models/offer";

@Component({
  selector: 'app-offers-list',
  templateUrl: 'offers-list.component.html',
  styleUrls: ['offers-list.component.scss']
})
export class OffersListComponent implements OnInit {

  @Input('offers')
  offers: Offer[] = [];

  @Input('editEnabled')
  editEnabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
