import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddOfferComponent} from "./add-offer.component";

const routes: Routes = [
  {path: '', component: AddOfferComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddOfferRoutingModule { }
