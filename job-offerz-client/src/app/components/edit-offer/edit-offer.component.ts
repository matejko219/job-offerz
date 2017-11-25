import {Component, OnInit, OnDestroy} from '@angular/core';
import {Offer} from "../../models/offer";
import {SnackBarService} from "../../shared/services/snack-bar.service";
import {OfferService} from "../../services/offer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DialogService} from "../../shared/services/dialog.service";

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
              private router: Router,
              private dialogService: DialogService,
              private offerService: OfferService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this._id = params['id'];
      this.loadOffer();
    });
  }

  loadOffer() {
    this.loading = true;
    this.offerService.get(this._id).subscribe((offerToEdit) => {
        this.offerToEdit = offerToEdit;
        this.loading = false;
    }, err => {
      this.snackBarService.error(err);
      this.loading = false;
    });
  }

  onSubmit(offer: Offer) {
    this.dialogService.confirmUpdate().subscribe((result) => {
      if (result) {
        offer = {...this.offerToEdit, ...offer};
        this.offerService.update(offer).subscribe((offer: Offer) => {
          this.snackBarService.success('Zapisano zmiany w ofercie');
          this.router.navigate(['/offers', offer._id]);
        }, err => {
          this.snackBarService.error(err);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
