import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'
import {BasicPage} from "./basic-page.interface";
import {BasicCrud} from "./basic-crud.interface";
import {PageRequest} from "../models/pagination/page-request";
import {Page} from "../models/pagination/page";
import {HttpUtils} from "../utils/http-utils";

@Injectable()
export class UserService implements BasicPage<User>, BasicCrud<User>{

  baseUrl = '/users';

  constructor(private http: Http) { }

  getPage(pageRequest: PageRequest, filter: string): Observable<Page<User>> {
    const params = {...pageRequest, filter};
    return this.http.get(`${this.baseUrl}/page`, {params})
      .map(HttpUtils.mapResponse);
  }

  getAll(): Observable<User[]> {
    return undefined;
  }

  get(_id: string): Observable<User> {
    return undefined;
  }

  add(obj: User): Observable<User> {
    return undefined;
  }

  update(obj: User): Observable<User> {
    return undefined;
  }

  remove(_id: string): Observable<boolean> {
    return undefined;
  }

  public signup(user: User): Observable<boolean> {
    return this.http.post('/signup', user)
      .map((resp: Response) => {
        return resp.json().success ? true : false;
      });
  }

}
