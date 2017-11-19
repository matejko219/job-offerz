import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {OfferService} from "../../../services/offer.service";
import {Offer} from "../../../models/offer";
import {SnackBarService} from "../../services/snack-bar.service";
import {FavoriteOfferService} from "../../../services/favorite-offer.service";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  _id: string;
  offer: Offer;
  loading: boolean = false;
  isInMyFavorite: boolean = false;

  constructor(private route: ActivatedRoute,
              private offerService: OfferService,
              private favoriteOfferService: FavoriteOfferService,
              private snackBarService: SnackBarService,
              public authService: AuthenticationService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this._id = params['id'];
      this.loading = true;
      this.offerService.get(this._id).subscribe((offer) => {
          this.offer = offer;
          this.loading = false;
          this.checkIfFavorite();
      }, err => {
        this.snackBarService.error(err);
        this.loading = false;
      });
    })
  }

  checkIfFavorite() {
    if (this.authService.isUserLogged()) {
      this.favoriteOfferService.isInMyFavorites(this.offer._id).subscribe((result) => {
          this.isInMyFavorite = result;
      }, err => {
        this.snackBarService.error(err);
      });
    }
  }

  onFavClick() {
    if (this.isInMyFavorite) {
      this.favoriteOfferService.removeFromFavorites(this.offer._id).subscribe((result) => {
          this.isInMyFavorite = !result;
      }, err => {
        this.snackBarService.error(err);
      });

    } else {
      this.favoriteOfferService.addToFavorites(this.offer._id).subscribe((result) => {
        this.isInMyFavorite = result;
      }, err => {
        this.snackBarService.error(err);
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
