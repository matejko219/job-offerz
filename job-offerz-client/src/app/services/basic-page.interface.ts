import {Page} from "../models/pagination/page";
import {Observable} from "rxjs";
import {PageRequest} from "../models/pagination/page-request";
/**
 * Created by DELL on 2017-11-27.
 */
export interface BasicPage<T> {
  getPage(pageRequest: PageRequest, filter: string): Observable<Page<T>>;
}
