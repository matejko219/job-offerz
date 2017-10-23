import { NgModule } from '@angular/core';
import {MaterialModule} from "./material.module";
import {FooterComponent} from "../../components/footer/footer.component";

@NgModule({
  imports: [
    MaterialModule
  ],
  declarations: [
    FooterComponent
  ],
  exports: [
    MaterialModule,
    FooterComponent
  ]
})
export class SharedModule { }
