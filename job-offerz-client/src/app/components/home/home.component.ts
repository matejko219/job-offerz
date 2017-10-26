import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {SnackBarService} from "../../shared/services/snack-bar.service";
import {AppConsts} from "../../utils/app-consts";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  appName: string = AppConsts.APP_NAME;

  constructor(public authService: AuthenticationService,
              private router: Router,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
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
