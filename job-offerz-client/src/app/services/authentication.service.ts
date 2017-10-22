import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Credentials} from "../models/credentials";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  private token: string;
  private tokenStorageKey = 'token';
  apiUrl = environment.apiUrl;

  constructor(private http: Http) {

  }

  public authenticate(credentials: Credentials): Observable<boolean> {
    const path = `${this.apiUrl}/authenticate`;
    return this.http.post(path, credentials)
      .map((resp: Response) => {
        const grantedToken = resp.json().token;
        if (grantedToken) {
          this.token = grantedToken;
          localStorage.setItem(this.tokenStorageKey, grantedToken);
          return true;
        } else {
          return false;
        }
      });
  }

  public logout(): Observable<boolean> {
    const path = `${this.apiUrl}/logout`;
    return this.http.get(path)
      .map((resp: Response) => {
        if (resp.json().success) {
          this.token = null;
          localStorage.removeItem(this.tokenStorageKey);
          return true;
        } else return false;
      });
  }

  public getToken(): string {
    return this.token ? this.token : localStorage.getItem(this.tokenStorageKey);
  }

  public isUserLogged(): boolean {
    return this.getToken() != null;
  }

}
