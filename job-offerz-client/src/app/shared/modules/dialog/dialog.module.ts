import { NgModule } from '@angular/core';
import {MatDialogModule} from "@angular/material";
import {ConfirmDeleteComponent} from "./components/confirm-delete/confirm-delete.component";
import {DialogService} from "../../services/dialog.service";
import {MaterialModule} from "../material.module";

@NgModule({
  imports: [
    MatDialogModule,
    MaterialModule
  ],
  declarations: [
    ConfirmDeleteComponent
  ],
  providers: [
    DialogService
  ],
  entryComponents: [
    ConfirmDeleteComponent
  ]
})
export class DialogModule { }
