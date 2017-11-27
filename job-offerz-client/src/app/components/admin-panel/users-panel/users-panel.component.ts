import { Component, OnInit } from '@angular/core';
import {AbstractPanelPage} from "../../../shared/component-helpers/abstract-param-page";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {Page} from "../../../models/pagination/page";
import {SnackBarService} from "../../../shared/services/snack-bar.service";

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.scss']
})
export class UsersPanelComponent extends AbstractPanelPage<User> implements OnInit {

  constructor(private userService: UserService,
              private snackBarService: SnackBarService) {
    super('login');
    this.loadPage();
  }

  ngOnInit() {
  }

  loadPage() {
    this.loading = true;
    this.userService.getPage(this.pageRequest, this.filter).subscribe((users: Page<User>) => {
      this.params = users;
      this.loading = false;
    }, err => {
      this.snackBarService.error(err);
      this.loading = false;
    });
  }

  onSubmit(user: User) {

  }

  onDeleteClick(user: User) {

  }

}
