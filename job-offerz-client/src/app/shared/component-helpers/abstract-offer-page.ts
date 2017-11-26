import {Page} from "../../models/pagination/page";
import {Offer} from "../../models/offer";
import {PageRequest} from "../../models/pagination/page-request";
import {Category} from "../../models/category";
import {OfferFilters} from "../../models/filters/offer-filters";
/**
 * Created by DELL on 2017-11-26.
 */
export abstract class AbstractOfferPage {

  offers: Page<Offer>;
  pageRequest: PageRequest;
  selectedCategory: Category;
  filters: OfferFilters;
  loading: boolean = false;

  constructor() {
    this.filters = new OfferFilters();
    this.pageRequest = new PageRequest();
    this.pageRequest.sortField = 'createDate';
    this.pageRequest.sortDir = -1;
  }

  abstract loadOffersPage();

  onPageChange(pageRequest: PageRequest) {
    this.pageRequest = {...this.pageRequest, ...pageRequest};
    this.loadOffersPage();
  }

  onCategoryChange(category: Category) {
    this.selectedCategory = category;
    this.resetPageToFirst();
    this.loadOffersPage();
  }

  onFiltersChange(filters: OfferFilters) {
    this.filters = filters;
    this.resetPageToFirst();
    this.loadOffersPage();
  }

  onSortDirChange(dir: number) {
    this.pageRequest.sortDir = dir;
    this.loadOffersPage();
  }

  resetPageToFirst() {
    this.pageRequest.page = 1;
  }

}
