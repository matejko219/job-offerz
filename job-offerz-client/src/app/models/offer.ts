import {Category} from "./category";
import {Company} from "./company";
import {OfferDetails} from "./offer-details";
import {User} from "./user";

/**
 * Created by DELL on 2017-10-28.
 */
export class Offer {
  _id: string;
  position: string;
  category: Category;
  location: string;
  company: Company;
  offerDetails: OfferDetails;
  user: User;
  createDate: Date;
}
