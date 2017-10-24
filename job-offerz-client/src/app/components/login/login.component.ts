import {Component, OnInit} from '@angular/core';
import {Credentials} from "../../models/credentials";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {SnackBarService} from "../../shared/services/snack-bar.service";
import {AppConsts} from "../../utils/app-consts";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: Credentials = new Credentials();
  appName: string = AppConsts.APP_NAME;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.authenticate(this.credentials).subscribe((result) => {
       if (result) {
         this.snackBarService.success('Zalogowano');
         this.router.navigate(['/']);
       } else {
         this.snackBarService.error('Błąd podczas logowania');
       }
    },err => {
      this.snackBarService.error(err);
    });
  }

}
