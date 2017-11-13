import {Requirement} from "./requirement";
import {Terms} from "./terms";
import {Bonus} from "./bonus";
import {ContactDetails} from "./contact-details";

/**
 * Created by DELL on 2017-11-12.
 */
export class OfferDetails {
  description: string;
  requirements?: Requirement[];
  terms: Terms;
  bonuses?: Bonus[];
  contactDetails: ContactDetails;
}
