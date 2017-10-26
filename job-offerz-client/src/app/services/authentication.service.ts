import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptionsArgs} from "@angular/http";
import {Credentials} from "../models/credentials";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'
import {AppConsts} from "../utils/app-consts";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {

  private token: string;

  constructor(private http: Http, private router: Router) {}

  public authenticate(credentials: Credentials): Observable<boolean> {
    return this.http.post('/authenticate', credentials)
      .map((resp: Response) => {
        const grantedToken = resp.json().token;
        if (grantedToken) {
          this.token = grantedToken;
          localStorage.setItem(AppConsts.TOKEN_STORAGE_KEY, grantedToken);
          return true;
        } else {
          return false;
        }
      });
  }

  public logout(): Observable<boolean> {
    return this.http.get('/logout')
      .map((resp: Response) => {
        this.removeToken();
        return resp.json().success;
      }).catch(err => {
        this.removeToken();
        return Observable.throw(err);
      });
  }

  private removeToken() {
    this.token = null;
    localStorage.removeItem(AppConsts.TOKEN_STORAGE_KEY);
  }

  public getToken(): string {
    return this.token ? this.token : localStorage.getItem(AppConsts.TOKEN_STORAGE_KEY);
  }

  public isUserLogged(): boolean {
    return this.getToken() != null;
  }

}
