import {Component, OnInit} from '@angular/core';
import {Offer} from "../../models/offer";
import {Category} from "../../models/category";
import {Page} from "../../models/pagination/page";
import {PageRequest} from "../../models/pagination/page-request";
import {OfferFilters} from "../../models/filters/offer-filters";
import {OfferService} from "../../services/offer.service";
import {SnackBarService} from "../../shared/services/snack-bar.service";

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {

  addedLabel = 'Dodane';
  favoriteLabel = 'Ulubione';

  offers: Page<Offer>;
  pageRequest: PageRequest;
  selectedCategory: Category;
  filters: OfferFilters;
  loading: boolean = false;

  constructor(private offerService: OfferService,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.filters = new OfferFilters();
    this.pageRequest = new PageRequest();
    this.pageRequest.sortField = 'createDate';
    this.pageRequest.sortDir = -1;
  }

  loadOffersPage() {
    this.loading = true;
    this.offerService.getAddedPage(this.pageRequest, this.selectedCategory._id, this.filters).subscribe((page) => {
      this.offers = page;
      this.loading = false;
    }, err => {
      this.snackBarService.error(err);
      this.loading = false;
    });
  }

  onPageChange(pageRequest: PageRequest) {
    this.pageRequest = pageRequest;
    this.pageRequest.sortField = 'createDate';
    this.pageRequest.sortDir = -1;
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
