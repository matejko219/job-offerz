import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class OnlyLoggedOut implements CanActivate{

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    if (this.authService.isUserLogged()) {
      this.router.navigate(['/']);
      return false;
    } else return true;
  }

}
