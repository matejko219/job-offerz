import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesPanelComponent} from "./categories-panel.component";

const routes: Routes = [
  {path: '', component: CategoriesPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesPanelRoutingModule { }
