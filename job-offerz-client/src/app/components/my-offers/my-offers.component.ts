import {Component, OnInit} from '@angular/core';
import {Offer} from "../../models/offer";
import {Category} from "../../models/category";
import {Page} from "../../models/pagination/page";
import {PageRequest} from "../../models/pagination/page-request";
import {OfferFilters} from "../../models/filters/offer-filters";
import {OfferService} from "../../services/offer.service";
import {SnackBarService} from "../../shared/services/snack-bar.service";
import {FavoriteOfferService} from "../../services/favorite-offer.service";
import {AppConsts} from "../../utils/app-consts";
import {DialogService} from "../../shared/services/dialog.service";

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
  mode: 'added' | 'favorite' = 'added';

  constructor(private offerService: OfferService,
              private favoriteOfferService: FavoriteOfferService,
              private dialogService: DialogService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.filters = new OfferFilters();
    this.pageRequest = new PageRequest();
    this.pageRequest.sortField = 'createDate';
    this.pageRequest.sortDir = -1;
  }

  loadOffersPage() {
    this.loading = true;
    if (this.mode == 'added') {
      this.loadAdded();
    } else this.loadFavorite();
  }

  loadAdded() {
    this.offerService.getAddedPage(this.pageRequest, this.selectedCategory._id, this.filters).subscribe((page) => {
      this.offers = page;
      this.loading = false;
    }, err => {
      this.snackBarService.error(err);
      this.loading = false;
    });
  }

  loadFavorite() {
    this.favoriteOfferService.getPage(this.pageRequest, this.selectedCategory._id, this.filters).subscribe((page) => {
      this.offers = page;
      this.loading = false;
    }, err => {
      this.snackBarService.error(err);
      this.loading = false;
    });
  }

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

  selectedModeChange(tabIndex: number) {
    this.mode = tabIndex == 0 ? 'added' : 'favorite';
    this.resetPageToFirst();
    this.loadOffersPage();
  }

  onActionClick(action: {_id: string, type: string}) {
    switch (action.type) {
      case AppConsts.ACTION_FAVORITE:
        this.onFavoriteAction(action._id);
        break;
      case AppConsts.ACTION_DELETE:
        this.onDeleteAction(action._id);
        break;
      case AppConsts.ACTION_EDIT:
        this.onEditAction(action._id);
        break;
      default:
        console.log('Akcja nie wspierana');
    }
  }

  onFavoriteAction(_id: string) {
    this.favoriteOfferService.removeFromFavorites(_id).subscribe((result) => {
      this.snackBarService.success('Usunięto z ulubionych');
      this.loadOffersPage();
    }, err => {
      this.snackBarService.error(err);
    });
  }

  onDeleteAction(_id: string) {
    this.dialogService.confirmDelete('Czy napewno chcesz usunąć ofertę?').subscribe((result) => {
      if (result) {
        this.offerService.remove(_id).subscribe((result) => {
          this.snackBarService.success('Oferta została usunięta');
          this.loadOffersPage();
        }, err => {
          this.snackBarService.error(err);
        });
      }
    });
  }

  onEditAction(_id: string) {
    this.snackBarService.info('Edycja jeszcze nie wspierana :)');
  }

}
