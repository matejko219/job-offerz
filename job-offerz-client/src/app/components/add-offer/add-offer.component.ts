import { Component, OnInit } from '@angular/core';
import {Offer} from "../../models/offer";
import {OfferService} from "../../services/offer.service";
import {SnackBarService} from "../../shared/services/snack-bar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {

  constructor(private offerService: OfferService,
              private router: Router,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
  }

  onSubmit(offer: Offer) {
    this.offerService.add(offer).subscribe((offer: Offer) => {
      this.snackBarService.success('Dodano ofertę');
      this.router.navigate(['/offers', offer._id]);
    }, err => {
      this.snackBarService.error(err);
    });
  }

}
