import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OffersComponent} from "./offers.component";
import {OfferDetailsComponent} from "./offer-details/offer-details.component";

const routes: Routes = [
  {path: '', component: OffersComponent},
  {path: ':id', component: OfferDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
