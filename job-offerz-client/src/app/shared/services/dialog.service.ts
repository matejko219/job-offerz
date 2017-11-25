import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material";
import {ConfirmDialogComponent} from "../modules/dialog/components/confirm-dialog/confirm-dialog.component";
import {Observable} from "rxjs";

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  private confirm(msg: string, confirmBtnTxt: string): Observable<any> {
    let dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.msg = msg;
    dialogRef.componentInstance.confirmBtnTxt = confirmBtnTxt;
    return dialogRef.afterClosed();
  }

  public confirmDelete(msg: string): Observable<any> {
    return this.confirm(msg, 'Usuń');
  }

  public confirmUpdate(msg?: string): Observable<any> {
    return this.confirm(msg || 'Czy napewno chcesz zapisać zmiany?', 'Zapisz');
  }

}
