import {PageRequest} from "../../models/pagination/page-request";
import {Page} from "../../models/pagination/page";
/**
 * Created by DELL on 2017-11-26.
 */
export abstract class AbstractPanelPage<T> {

  pageRequest: PageRequest;
  loading: boolean = false;
  filter: string = '';
  params: Page<T>;
  showForm: boolean = false;
  paramToEdit: T;
  mode: 'add' | 'edit' = 'add';

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

  onCancelAdd() {
    this.showForm = false;
  }

  onAddNewClick() {
    this.paramToEdit = null;
    this.mode = 'add';
    this.showForm = true;
  }

  onEditClick(param: T) {
    this.paramToEdit = param;
    this.mode = 'edit';
    this.showForm = true;
  }

  onSubmit(param: T) {
    this.showForm = false;
    this.loadPage();
  }

}
