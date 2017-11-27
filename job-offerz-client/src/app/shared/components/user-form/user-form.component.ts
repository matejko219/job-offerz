import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {User} from "../../../models/user";
import {Authorities} from "../../../utils/authorities-consts";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  _user: User = new User();

  @Input()
  set user(user: User) {
   if (user) this._user = {...user};
  }

  get user(): User {
    return this._user;
  }

  repeatPasswd: string = '';

  @Input()
  mode: 'add' | 'edit' | 'register' = 'register';

  buttonLabels = {
    add: 'Dodaj',
    register: 'Utwórz konto'
  };

  @Output()
  submitEvent: EventEmitter<User> = new EventEmitter<User>();

  @Output('cancel')
  cancelEvent: EventEmitter<void> = new EventEmitter<void>();

  authorities: string[] = [Authorities.ROLE_USER, Authorities.ROLE_ADMIN];

  constructor() { }

  ngOnInit() {
    this.setDefaultParams();
  }

  onSubmit() {
    this.submitEvent.next(this.user);
  }

  cancelForm() {
    this.user = new User();
    this.cancelEvent.next();
  }

  setDefaultParams() {
    if (!this.user.authority) {
      this.user.authority = 'ROLE_USER';
    }

    if (this.user.active == null) {
      this.user.active = true;
    }
  }

}
