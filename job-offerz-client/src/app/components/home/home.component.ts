import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {Router} from "@angular/router";
import {SnackBarService} from "../../shared/services/snack-bar.service";
import {AppConsts} from "../../utils/app-consts";
import {User} from "../../models/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  user: Observable<User>;

  constructor(public authService: AuthenticationService,
              private router: Router,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.user = this.authService.getLoggedUser();
  }

  logout() {
    this.authService.logout().subscribe((result) => {
      this.snackBarService.success('Wylogowano');
    },err => {
      this.snackBarService.error(err);
    },() => {
      this.router.navigate(['login']);
    });
  }

}
