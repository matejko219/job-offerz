import { Injectable } from '@angular/core';
import {BasicCrud} from "./basic-crud.interface";
import {Offer} from "../models/offer";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {HttpUtils} from "../utils/http-utils";

@Injectable()
export class OfferService implements BasicCrud<Offer> {

  baseUrl = '/offers';

  constructor(private http: Http) { }

  getAll(): Observable<Offer[]> {
    return undefined;
  }

  get(_id: string): Observable<Offer> {
    return undefined;
  }

  add(obj: Offer): Observable<Offer> {
    return this.http.post(this.baseUrl, obj)
      .map(HttpUtils.mapResponse);
  }

  update(obj: Offer): Observable<Offer> {
    return undefined;
  }

  remove(_id: string): Observable<boolean> {
    return undefined;
  }

}
