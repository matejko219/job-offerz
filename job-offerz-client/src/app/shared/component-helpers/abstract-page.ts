import {PageRequest} from "../../models/pagination/page-request";
/**
 * Created by DELL on 2017-11-26.
 */
export abstract class AbstractPage {

  pageRequest: PageRequest;
  loading: boolean = false;
  filter: string = '';

  constructor(initSortField: string) {
    this.pageRequest = new PageRequest();
    this.pageRequest.sortField = initSortField;
    this.pageRequest.sortDir = 1;
  }

  abstract loadPage();

  setPage({pageSize, pageIndex}) {
    this.pageRequest.limit = pageSize;
    this.pageRequest.page = pageIndex + 1;
    this.loadPage();
  }

  sortChange() {
    this.loadPage();
  }

  filterChange(filter: string) {
    this.filter = filter;
    this.resetPageToFirst();
    this.loadPage();
  }

  resetPageToFirst() {
    this.pageRequest.page = 1;
  }

}
