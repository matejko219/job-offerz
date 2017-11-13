import { Component, OnInit } from '@angular/core';
import {Offer} from "../../models/offer";
import {OfferService} from "../../services/offer.service";
import {Http} from "@angular/http";
import {SnackBarService} from "../../shared/services/snack-bar.service";

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {

  constructor(private offerService: OfferService,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
  }

  onSubmit(offer: Offer) {
    this.offerService.add(offer).subscribe((offer: Offer) => {
      this.snackBarService.success('Dodano ofertę');
    }, err => {
      this.snackBarService.error(err);
    });
  }

}
