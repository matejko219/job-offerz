import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Http, Response} from "@angular/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: Http) { }

  public signup(user: User): Observable<boolean> {
    const path = `${this.apiUrl}/signup`;
    return this.http.post(path, user)
      .map((resp: Response) => {
        return resp.json().success ? true : false;
      });
  }

}
