import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesPanelRoutingModule } from './categories-panel-routing.module';
import {CategoriesPanelComponent} from "./categories-panel.component";

@NgModule({
  imports: [
    CommonModule,
    CategoriesPanelRoutingModule
  ],
  declarations: [CategoriesPanelComponent]
})
export class CategoriesPanelModule { }
