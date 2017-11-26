import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class OnlyAdmin implements CanActivate, CanActivateChild{

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    return this.hasAdminAuthorities();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    return this.hasAdminAuthorities();
  }

  private hasAdminAuthorities(): boolean {
    if (!this.authService.hasUserAdminAuthority()) {
      this.router.navigate(['/']);
      return false;
    } else return true;
  }

}
