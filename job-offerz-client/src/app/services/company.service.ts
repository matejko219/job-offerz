import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {Company} from "../models/company";
import {BasicCrud} from "./basic-crud.interface";
import {HttpUtils} from "../utils/http-utils";
import {PageRequest} from "../models/pagination/page-request";
import {Page} from "../models/pagination/page";
import {BasicPage} from "./basic-page.interface";

@Injectable()
export class CompanyService implements BasicCrud<Company>, BasicPage<Company> {

  baseUrl = '/companies';

  constructor(private http: Http) { }

  getPage(pageRequest: PageRequest, filter: string): Observable<Page<Company>> {
    const params = {...pageRequest, filter};
    return this.http.get(`${this.baseUrl}/page`, {params})
      .map(HttpUtils.mapResponse);
  }

  getAll(name?: string): Observable<Company[]> {
    const params = name !== null ? {name} : {};
    return this.http.get(this.baseUrl, {params})
      .map(HttpUtils.mapResponse);
  }

  get(_id: string): Observable<Company> {
    return undefined;
  }

  add(obj: Company): Observable<Company> {
    return this.http.post(this.baseUrl, obj)
      .map(HttpUtils.mapResponse);
  }

  update(obj: Company): Observable<Company> {
    return this.http.put(this.baseUrl, obj)
      .map(HttpUtils.mapResponse);
  }

  remove(_id: string): Observable<boolean> {
    return undefined;
  }

}
