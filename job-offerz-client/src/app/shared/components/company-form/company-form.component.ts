import {Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Company} from "../../../models/company";
import {CompanyService} from "../../../services/company.service";
import {AppConsts} from "../../../utils/app-consts";
import {SnackBarService} from "../../services/snack-bar.service";
import {OfferFormConsts} from "../../../utils/offer-form-consts";
import {FormUtils} from "../../../utils/form-utils";

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  formGroup: FormGroup;

  @ViewChild('imageInput')
  imageInput: ElementRef;

  imagePreview;
  isImageInputClicked = false;

  @Output('cancel')
  cancelEvent: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  submitEvent: EventEmitter<Company> = new EventEmitter<Company>();

  @Input('initName')
  initName: string = '';

  @Input()
  companyToEdit: Company;

  @Input()
  mode: 'add' | 'edit' = 'add';

  @Input()
  adminPanel: boolean = false;

  nameMaxLength = OfferFormConsts.MAX_COMP_NAME_LENGTH;
  checkInputLength = FormUtils.checkInputLength;

  constructor(private formBuilder: FormBuilder,
              private snackBarService: SnackBarService,
              private companyService: CompanyService) { }

  ngOnInit() {
    if (this.companyToEdit) {
      this.imagePreview = new Image();
      this.imagePreview.src = this.companyToEdit.logo;
    }

    this.formGroup = this.formBuilder.group({
      name: [this.companyToEdit ? this.companyToEdit.name : this.initName, Validators.compose([Validators.required, Validators.maxLength(this.nameMaxLength)])],
      logo: [this.companyToEdit ? this.companyToEdit.logo : '', Validators.required],
      active: [this.companyToEdit ? this.companyToEdit.active : true, Validators.required]
    });
  }

  addCompany() {
    const company: Company = this.formGroup.getRawValue();
    this.companyService.add(company).subscribe((data: Company) => {
      this.submitEvent.next(data);
      this.snackBarService.success('Dodano firme');
    },err => {
      this.snackBarService.error(err);
    });
  }

  editCompany() {
    const company: Company = {...this.companyToEdit, ...this.formGroup.getRawValue()};
    this.companyService.update(company).subscribe((data: Company) => {
      this.submitEvent.next(data);
      this.snackBarService.success('Zaktualizowano firme');
    },err => {
      this.snackBarService.error(err);
    });
  }

  cancelAdd() {
    this.removeImage();
    this.formGroup.reset();
    this.cancelEvent.next();
  }

  loadImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        this.imagePreview = new Image();

        this.imagePreview.onload = (imageEvent) => {
          if (this.imagePreview.width > AppConsts.MAX_IMAGE_WIDTH || this.imagePreview.height > AppConsts.MAX_IMAGE_HEIGHT) {
            this.handleImageError(`Dozwolone wymiary to ${AppConsts.MAX_IMAGE_WIDTH}x${AppConsts.MAX_IMAGE_HEIGHT} px`);
            return;
          }
        };

        this.imagePreview.src = reader.result;
        this.formGroup.patchValue({logo: this.imagePreview.src});
      };

      const imageFile = event.target.files[0];

      if (!imageFile.type.startsWith('image/')) {
        this.handleImageError('Dozwolone tylko pliki graficzne');

      } else if (imageFile.size > (AppConsts.MAX_FILE_SIZE * 1024)) {
        this.handleImageError(`Dozwolony rozmiar to maks. ${AppConsts.MAX_FILE_SIZE}KB`);

      } else reader.readAsDataURL(imageFile);

    } else {
      this.handleImageError();
      this.imagePreview = null;
      event.target.value = '';
    }
  }

  handleImageError(msg?: string) {
    if (msg) this.snackBarService.error(msg);
    this.removeImage();
  }

  removeImage() {
    this.imagePreview = null;
    this.imageInput.nativeElement.value = '';
    this.formGroup.patchValue({logo: ''});
  }

  imageInputClicked() {
    this.isImageInputClicked = true;
  }

}
