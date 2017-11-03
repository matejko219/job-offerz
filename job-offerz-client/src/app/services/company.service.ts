import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Company} from "../models/company";
import {BasicCrud} from "../utils/BasicCrud";

@Injectable()
export class CompanyService implements BasicCrud<Company>{

  constructor(private http: Http) { }

  getAll(): Observable<Company[]> {
    return this.http.get('/companies')
      .map((resp: Response) => resp.json());
  }

  get(id: string): Observable<Company> {
    return undefined;
  }

  add(obj: Company): Observable<Company> {
    return this.http.post('/companies', obj)
      .map((resp: Response) => resp.json());
  }

  update(obj: Company): Observable<Company> {
    return undefined;
  }

  remove(id: string): Observable<boolean> {
    return undefined;
  }

}
