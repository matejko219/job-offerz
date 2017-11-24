import {Component, OnInit, OnDestroy} from '@angular/core';
import {Offer} from "../../models/offer";
import {SnackBarService} from "../../shared/services/snack-bar.service";
import {OfferService} from "../../services/offer.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  _id: string;
  loading: boolean = false;
  offerToEdit: Offer;

  constructor(private route: ActivatedRoute,
              private offerService: OfferService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this._id = params['id'];
      this.loading = true;
      this.loadOffer();
    });
  }

  loadOffer() {
    this.offerService.get(this._id).subscribe((offerToEdit) => {
        this.offerToEdit = offerToEdit;
        this.loading = false;
    }, err => {
      this.snackBarService.error(err);
      this.loading = false;
    });
  }

  onSubmit(offer: Offer) {
    this.offerService.update(offer).subscribe((offer: Offer) => {
      this.snackBarService.success('Zapisano zmiany w ofercie');
    }, err => {
      this.snackBarService.error(err);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
