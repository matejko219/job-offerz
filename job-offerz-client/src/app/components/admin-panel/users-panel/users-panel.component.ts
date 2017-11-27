import { Component, OnInit } from '@angular/core';
import {AbstractPanelPage} from "../../../shared/component-helpers/abstract-param-page";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {Page} from "../../../models/pagination/page";
import {SnackBarService} from "../../../shared/services/snack-bar.service";
import {DialogService} from "../../../shared/services/dialog.service";

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.scss']
})
export class UsersPanelComponent extends AbstractPanelPage<User> implements OnInit {

  constructor(private userService: UserService,
              private dialogService: DialogService,
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
    if (this.mode === 'add') {
      this.userService.signup(user).subscribe((result) => {
        this.snackBarService.success('Dodano użytkownika');
        this.showForm = false;
        this.loadPage();
      },err => {
        this.snackBarService.error(err);
      });
    } else {
      //edit
      this.dialogService.confirmUpdate().subscribe((result) => {
          if (result) {
            this.userService.update(user).subscribe((user) => {
              this.snackBarService.success('Zaktualizowano użytkownika');
              this.showForm = false;
              this.loadPage();
            },err => {
              this.snackBarService.error(err);
            });
          }
      });
    }
  }

  onDeleteClick(user: User) {
    this.dialogService.confirmDelete('Czy napewno chcesz usunąć użytkownika?').subscribe((result) => {
      if (result) {
        this.userService.remove(user._id).subscribe((result) => {
          this.snackBarService.success('Usunięto użytkownika');
          this.loadPage();
        },err => {
          this.snackBarService.error(err);
        });
      }
    });
  }

}
