import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {SnackBarService} from "../../shared/services/snack-bar.service";

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
  }

  onSubmit(user: User) {
    this.userService.signup(user).subscribe((result) => {
      if (result) {
        this.snackBarService.success('Utworzono nowe konto');
        this.router.navigate(['/login']);
      } else {
        this.snackBarService.error('Błąd podczas tworzenia konta');
      }
    },err => {
      this.snackBarService.error(err);
    });
  }

}
