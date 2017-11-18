import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {OfferService} from "../../../services/offer.service";
import {Offer} from "../../../models/offer";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  _id: string;
  offer: Offer;

  constructor(private route: ActivatedRoute,
              private offerService: OfferService,
              private snackBarService: SnackBarService,
              public authService: AuthenticationService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this._id = params['id'];
      this.offerService.get(this._id).subscribe((offer) => {
          this.offer = offer;
      },err => {
        this.snackBarService.error(err);
      });
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
