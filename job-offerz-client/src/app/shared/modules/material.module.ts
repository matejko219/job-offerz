import { NgModule } from '@angular/core';
import {
  MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatFormFieldModule,
  MatInputModule, MatButtonModule, MatSnackBarModule, MatCardModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SnackBarService} from "../services/snack-bar.service";

@NgModule({
  imports: [
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule
  ],
  exports: [
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule
  ],
  providers: [
    SnackBarService
  ]
})
export class MaterialModule { }
