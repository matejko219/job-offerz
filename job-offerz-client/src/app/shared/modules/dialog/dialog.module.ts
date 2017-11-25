import { NgModule } from '@angular/core';
import {MatDialogModule} from "@angular/material";
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import {DialogService} from "../../services/dialog.service";
import {MaterialModule} from "../material.module";

@NgModule({
  imports: [
    MatDialogModule,
    MaterialModule
  ],
  declarations: [
    ConfirmDialogComponent
  ],
  providers: [
    DialogService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class DialogModule { }
