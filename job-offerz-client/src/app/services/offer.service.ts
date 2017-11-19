import { Injectable } from '@angular/core';
import {BasicCrud} from "./basic-crud.interface";
import {Offer} from "../models/offer";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {HttpUtils} from "../utils/http-utils";
import {Page} from "../models/pagination/page";
import {PageRequest} from "../models/pagination/page-request";
import {OfferFilters} from "../models/filters/offer-filters";

@Injectable()
export class OfferService implements BasicCrud<Offer> {

  baseUrl = '/offers';

  constructor(private http: Http) { }

  getPage(pageRequest: PageRequest, category: string, filters: OfferFilters): Observable<Page<Offer>> {
    const params = {...pageRequest, category, ...filters};
    return this.http.get(this.baseUrl, {params})
      .map(HttpUtils.mapResponse);
  }

  getAddedPage(pageRequest: PageRequest, category: string, filters: OfferFilters): Observable<Page<Offer>> {
    const params = {...pageRequest, category, ...filters};
    return this.http.get(`${this.baseUrl}/added`, {params})
      .map(HttpUtils.mapResponse);
  }

  getAll(): Observable<Offer[]> {
    return undefined;
  }

  get(_id: string): Observable<Offer> {
    return this.http.get(`${this.baseUrl}/${_id}`)
      .map(HttpUtils.mapResponse);
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
