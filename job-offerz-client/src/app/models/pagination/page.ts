/**
 * Created by DELL on 2017-11-18.
 */
export class Page<T> {
  docs: T[];
  total: number = 0;
  limit: number = 5;
  page: number = 1;
  pages: number;
}
