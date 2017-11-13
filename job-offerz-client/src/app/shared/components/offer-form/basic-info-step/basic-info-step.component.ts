import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {OfferFormConsts} from "../../../../utils/offer-form-consts";
import {FormUtils} from "../../../../utils/form-utils";
import {Category} from "../../../../models/category";
import {CategoryService} from "../../../../services/category.service";

@Component({
  selector: 'app-basic-info-step',
  templateUrl: './basic-info-step.component.html',
  styleUrls: ['./basic-info-step.component.scss']
})
export class BasicInfoStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  categories: Category[];

  positionMaxLength = OfferFormConsts.MAX_POSITION_LENGTH;
  locationMaxLength = OfferFormConsts.MAX_LOCATION_LENGTH;
  checkInputLength = FormUtils.checkInputLength;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
        this.categories = categories;
    });
  }

}
