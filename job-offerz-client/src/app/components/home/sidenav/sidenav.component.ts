import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../models/user";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input()
  isUserLogged = false;

  @Input()
  user: Observable<User>;

  @Output()
  logout: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  toggle: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {

  }

  emitToggle() {
    this.toggle.next();
  }

  emitLogout() {
    this.logout.next();
  }
}
