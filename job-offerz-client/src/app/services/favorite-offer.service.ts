import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {PageRequest} from "../models/pagination/page-request";
import {Observable} from "rxjs";
import {OfferFilters} from "../models/filters/offer-filters";
import {Page} from "../models/pagination/page";
import {Offer} from "../models/offer";
import {HttpUtils} from "../utils/http-utils";

@Injectable()
export class FavoriteOfferService {

  baseUrl = '/favorite-offers';

  constructor(private http: Http) { }

  getPage(pageRequest: PageRequest, category: string, filters: OfferFilters): Observable<Page<Offer>> {
    const params = {...pageRequest, category, ...filters};
    return this.http.get(this.baseUrl, {params})
      .map(HttpUtils.mapResponse);
  }

  isInMyFavorites(_id: string): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/${_id}`)
      .map(HttpUtils.mapResponse);
  }

  addToFavorites(_id: string): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/${_id}`, '')
      .map(HttpUtils.mapResponse);
  }

  removeFromFavorites(_id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${_id}`)
      .map(HttpUtils.mapResponse);
  }

}
