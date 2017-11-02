import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {AppConsts} from "../../../utils/app-consts";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  appName: string = AppConsts.APP_NAME;

  @Output('openSidenav')
  openSidenav: EventEmitter<void> = new EventEmitter<void>();

  @Input('sidenavOpened')
  sidenavOpened: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  emitOpenSidenav() {
    this.openSidenav.next();
  }

}
