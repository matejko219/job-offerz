import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesPanelRoutingModule } from './categories-panel-routing.module';
import {CategoriesPanelComponent} from "./categories-panel.component";
import {SharedModule} from "../../../shared/modules/shared.module";
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CategoriesPanelRoutingModule
  ],
  declarations: [CategoriesPanelComponent, CategoryFormComponent]
})
export class CategoriesPanelModule { }
