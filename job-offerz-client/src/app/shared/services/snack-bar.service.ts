import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, SimpleSnackBar, MatSnackBarRef} from "@angular/material";

@Injectable()
export class SnackBarService {

  defaultConfig: MatSnackBarConfig;

  constructor(private snackBar: MatSnackBar) {
    this.defaultConfig = new MatSnackBarConfig();
    this.defaultConfig.duration = 3000;
  }

  info(msg: string): MatSnackBarRef<SimpleSnackBar> {
    this.defaultConfig.extraClasses = ['snackbar-info'];
    return this.snackBar.open(msg, undefined, this.defaultConfig);
  }

  success(msg: string): MatSnackBarRef<SimpleSnackBar> {
    this.defaultConfig.extraClasses = ['snackbar-success'];
    return this.snackBar.open(msg, undefined, this.defaultConfig);
  }

  error(msg: string): MatSnackBarRef<SimpleSnackBar> {
    this.defaultConfig.extraClasses = ['snackbar-error'];
    return this.snackBar.open(msg, undefined, this.defaultConfig);
  }

}
