import {Observable} from "rxjs";
/**
 * Created by DELL on 2017-11-03.
 */

export interface BasicCrud<T> {
  getAll(): Observable<T[]>
  get(id: string): Observable<T>
  add(obj: T): Observable<T>
  update(obj: T): Observable<T>
  remove(id: string): Observable<boolean>
}
