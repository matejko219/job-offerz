import { Component, OnInit } from '@angular/core';
import {AbstractOfferPageWithActions} from "../../../shared/component-helpers/abstract-offer-page-with-actions";
import {OfferService} from "../../../services/offer.service";
import {FavoriteOfferService} from "../../../services/favorite-offer.service";
import {DialogService} from "../../../shared/services/dialog.service";
import {Router, ActivatedRoute} from "@angular/router";
import {SnackBarService} from "../../../shared/services/snack-bar.service";

@Component({
  selector: 'app-offers-panel',
  templateUrl: './offers-panel.component.html',
  styleUrls: ['./offers-panel.component.scss']
})
export class OffersPanelComponent extends AbstractOfferPageWithActions implements OnInit {

  constructor(offerService: OfferService,
              favoriteOfferService: FavoriteOfferService,
              dialogService: DialogService,
              router: Router,
              route: ActivatedRoute,
              snackBarService: SnackBarService) {
    super(offerService, favoriteOfferService, dialogService, router, route, snackBarService);
  }

  ngOnInit() {
  }

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
