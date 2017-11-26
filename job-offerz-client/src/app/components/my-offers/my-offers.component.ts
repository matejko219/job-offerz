import {Component, OnInit} from '@angular/core';
import {OfferService} from "../../services/offer.service";
import {SnackBarService} from "../../shared/services/snack-bar.service";
import {FavoriteOfferService} from "../../services/favorite-offer.service";
import {DialogService} from "../../shared/services/dialog.service";
import {Router, ActivatedRoute} from "@angular/router";
import {AbstractOfferPageWithActions} from "../../shared/component-helpers/abstract-offer-page-with-actions";

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent extends AbstractOfferPageWithActions implements OnInit {

  addedLabel = 'Dodane';
  favoriteLabel = 'Ulubione';
  mode: 'added' | 'favorite' = 'added';

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
    if (this.mode == 'added') {
      this.loadAdded();
    } else this.loadFavorite();
  }

  loadAdded() {
    this.offerService.getAddedPage(this.pageRequest, this.selectedCategory._id, this.filters).subscribe((page) => {
      this.offers = page;
      this.loading = false;
    }, err => {
      this.snackBarService.error(err);
      this.loading = false;
    });
  }

  loadFavorite() {
    this.favoriteOfferService.getPage(this.pageRequest, this.selectedCategory._id, this.filters).subscribe((page) => {
      this.offers = page;
      this.loading = false;
    }, err => {
      this.snackBarService.error(err);
      this.loading = false;
    });
  }

  selectedModeChange(tabIndex: number) {
    this.mode = tabIndex == 0 ? 'added' : 'favorite';
    this.resetPageToFirst();
    this.loadOffersPage();
  }

}
