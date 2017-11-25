import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OffersPanelComponent} from "./offers-panel.component";

const routes: Routes = [
  {path: '', component: OffersPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersPanelRoutingModule { }
