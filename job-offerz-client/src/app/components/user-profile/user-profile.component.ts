import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {User} from "../../models/user";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {SnackBarService} from "../../shared/services/snack-bar.service";
import {DialogService} from "../../shared/services/dialog.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: User;
  subscription: Subscription;
  repeatPasswd: string = '';

  constructor(private authService: AuthenticationService,
              private userService: UserService,
              private dialogService: DialogService,
              private snackBarService: SnackBarService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.authService.getLoggedUser().subscribe((user) => {
      this.user = user;
    });
  }

  onSubmit(user: User) {
    this.dialogService.confirmUpdate().subscribe((result) => {
      if (result) {
        this.userService.update(user).subscribe((user) => {
          this.authService.nextUser(user);
          this.repeatPasswd = null;
          this.snackBarService.success('Zaktualizowano profil');
        },err => {
          this.snackBarService.error(err);
        });
      }
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
