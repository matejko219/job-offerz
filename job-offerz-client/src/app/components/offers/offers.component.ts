import { Component, OnInit } from '@angular/core';
import {OfferService} from "../../services/offer.service";
import {SnackBarService} from "../../shared/services/snack-bar.service";
import {AbstractOfferPage} from "../../shared/component-helpers/abstract-offer-page";

@Component({
  selector: 'app-offers',
  templateUrl: 'offers.component.html',
  styleUrls: ['offers.component.scss']
})
export class OffersComponent extends AbstractOfferPage implements OnInit {

  constructor(private offerService: OfferService,
              private snackBarService: SnackBarService) {
    super();
  }

  ngOnInit() {}

  loadOffersPage() {
    this.loading = true;
    this.offerService.getPage(this.pageRequest, this.selectedCategory._id, this.filters).subscribe((page) => {
      this.offers = page;
      this.loading = false;
    }, err => {
      this.snackBarService.error(err);
      this.loading = false;
    });
  }

}
