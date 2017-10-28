import { NgModule } from '@angular/core';
import {
  MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatFormFieldModule,
  MatInputModule, MatButtonModule, MatSnackBarModule, MatCardModule, MatPaginatorModule, MatTabsModule,
  MatSlideToggleModule
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
    MatCardModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSlideToggleModule
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
    MatCardModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSlideToggleModule
  ],
  providers: [
    SnackBarService
  ]
})
export class MaterialModule { }
