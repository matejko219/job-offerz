import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {SnackBarService} from "../../shared/services/snack-bar.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthenticationService,
              private router: Router,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe((result) => {
        if (result) {
          this.snackBarService.success('Wylogowano');
          this.router.navigate(['login']);
        } else {
          this.snackBarService.error('Błąd podczas wylogowywania');
        }
    },err => {
      this.snackBarService.error(err);
    });
  }

}
