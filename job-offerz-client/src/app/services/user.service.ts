import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  public signup(user: User): Observable<boolean> {
    return this.http.post('/signup', user)
      .map((resp: Response) => {
        return resp.json().success ? true : false;
      });
  }

}
