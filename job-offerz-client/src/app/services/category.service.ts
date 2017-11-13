import { Injectable } from '@angular/core';
import {BasicCrud} from "./basic-crud.interface";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {HttpUtils} from "../utils/http-utils";
import {Category} from "../models/category";

@Injectable()
export class CategoryService implements BasicCrud<Category>{

  baseUrl = '/categories';

  constructor(private http: Http) { }

  getAll(): Observable<Category[]> {
    return this.http.get(this.baseUrl)
      .map(HttpUtils.mapResponse);
  }

  get(_id: string): Observable<Category> {
    return undefined;
  }

  add(obj: Category): Observable<Category> {
    return this.http.post(this.baseUrl, obj)
      .map(HttpUtils.mapResponse);
  }

  update(obj: Category): Observable<Category> {
    return undefined;
  }

  remove(_id: string): Observable<boolean> {
    return undefined;
  }

}
