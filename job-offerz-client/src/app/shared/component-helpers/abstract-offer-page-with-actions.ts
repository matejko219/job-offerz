import {AbstractOfferPage} from "./abstract-offer-page";
import {AppConsts} from "../../utils/app-consts";
import {OfferService} from "../../services/offer.service";
import {FavoriteOfferService} from "../../services/favorite-offer.service";
import {Router, ActivatedRoute} from "@angular/router";
import {SnackBarService} from "../services/snack-bar.service";
import {DialogService} from "../services/dialog.service";
/**
 * Created by DELL on 2017-11-26.
 */
export abstract class AbstractOfferPageWithActions extends AbstractOfferPage{

  constructor(protected offerService: OfferService,
              protected favoriteOfferService: FavoriteOfferService,
              protected dialogService: DialogService,
              protected router: Router,
              protected route: ActivatedRoute,
              protected snackBarService: SnackBarService) {
    super();
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
    this.router.navigate(['/my-offers/edit', _id], {relativeTo: this.route});
  }
}
