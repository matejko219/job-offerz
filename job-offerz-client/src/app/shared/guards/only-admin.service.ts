import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class OnlyAdmin implements CanActivate{

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    if (!this.authService.hasUserAdminAuthority()) {
      this.router.navigate(['/']);
      return false;
    } else return true;
  }

}
