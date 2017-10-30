import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Credentials} from "../models/credentials";
import {Observable, BehaviorSubject} from "rxjs";
import 'rxjs/add/operator/map'
import {AppConsts} from "../utils/app-consts";
import {JwtHelper} from "angular2-jwt";
import {User} from "../models/user";

@Injectable()
export class AuthenticationService {

  private token: string;
  private user: BehaviorSubject<User>;

  constructor(private http: Http, private jwtHelper: JwtHelper) {
    this.user = new BehaviorSubject<User>(new User());
    this.token = this.getToken();
    this.nextUserFromToken();
  }

  public authenticate(credentials: Credentials): Observable<boolean> {
    return this.http.post('/authenticate', credentials)
      .map((resp: Response) => {
        const grantedToken = resp.json().token;
        if (grantedToken) {
          this.token = grantedToken;
          localStorage.setItem(AppConsts.TOKEN_STORAGE_KEY, this.token);
          this.nextUserFromToken();
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

  public removeToken() {
    this.token = null;
    localStorage.removeItem(AppConsts.TOKEN_STORAGE_KEY);
  }

  private nextUserFromToken() {
    const token = this.getToken();
    if (token) this.user.next(this.jwtHelper.decodeToken(token).user);
  }

  public getToken(): string {
    return this.token ? this.token : localStorage.getItem(AppConsts.TOKEN_STORAGE_KEY);
  }

  public isUserLogged(): boolean {
    return this.getToken() != null;
  }

  public getLoggedUser(): Observable<User> {
    return this.user.asObservable();
  }

}
