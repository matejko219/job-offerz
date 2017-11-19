import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material";
import {ConfirmDeleteComponent} from "../modules/dialog/components/confirm-delete/confirm-delete.component";
import {Observable} from "rxjs";

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDelete(msg: string): Observable<any> {
    let dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.componentInstance.msg = msg;
    return dialogRef.afterClosed();
  }

}
