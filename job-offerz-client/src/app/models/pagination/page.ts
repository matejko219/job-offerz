/**
 * Created by DELL on 2017-11-18.
 */
export class Page<T> {
  docs: T[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
