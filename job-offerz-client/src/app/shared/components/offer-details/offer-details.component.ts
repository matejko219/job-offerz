import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  id: number;

  constructor(private route: ActivatedRoute, public authService: AuthenticationService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
