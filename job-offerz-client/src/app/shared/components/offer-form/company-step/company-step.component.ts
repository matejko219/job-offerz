import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {SnackBarService} from "../../../services/snack-bar.service";
import {AppConsts} from "../../../../utils/app-consts";
import {CompanyService} from "../../../../services/company.service";
import {Company} from "../../../../models/company";

@Component({
  selector: 'app-company-step',
  templateUrl: './company-step.component.html',
  styleUrls: ['./company-step.component.scss']
})
export class CompanyStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  @Input('companyIdCtrl')
  companyIdCtrl: FormControl;

  @ViewChild('imageInput')
  imageInput: ElementRef;

  newCompanyFormGroup: FormGroup;

  companies = [
    {id: 1, name: 'Comarch S.A.'},
    {id: 2, name: 'PGS Software'},
    {id: 3, name: 'Ailleron S.A.'}
  ];

  filteredCompanies: Observable<any>;
  showCompanyForm: boolean = false;
  imagePreview;

  constructor(private formBuilder: FormBuilder,
              private snackBarService: SnackBarService,
              private companyService: CompanyService) {

  }

  ngOnInit() {

    this.filteredCompanies = this.companyIdCtrl.valueChanges
      .startWith(null)
      .map(companyName => companyName ? this.filterCompanies(companyName) : this.companies.slice());

    this.newCompanyFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      logo: ['']
    });

  }

  filterCompanies(name: string) {
    return this.companies.filter(company =>
      company.name.toString().toLowerCase()
        .includes(name.toString().toLowerCase())
    );
  }

  companyDisplayFn(value: any) {
    return value ? value.name : null;
  }

  showNewCompanyForm() {
    const companyName = this.companyIdCtrl.value.name || this.companyIdCtrl.value;
    this.newCompanyFormGroup.patchValue({name: companyName});
    this.showCompanyForm = true;
  }

  addCompany() {
    const company: Company = this.newCompanyFormGroup.getRawValue();
    this.companyService.add(company).subscribe((data: Company) => {
      this.companyIdCtrl.setValue({_id: data._id, name: data.name, logo: data.logo});
      this.showCompanyForm = false;
      this.snackBarService.success('Dodano firme');
    },err => {
      this.snackBarService.error(err);
    });
  }

  cancelAdd() {
    this.newCompanyFormGroup.patchValue({name: '', logo: ''});
    this.showCompanyForm = false;
    this.imagePreview = null;
  }

  loadImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        this.imagePreview = new Image();

        this.imagePreview.onload = (imageEvent) => {
          if (this.imagePreview.width > AppConsts.MAX_WIDTH || this.imagePreview.height > AppConsts.MAX_HEIGHT) {
            this.handleImageError(`Dozwolone wymiary to ${AppConsts.MAX_WIDTH}x${AppConsts.MAX_HEIGHT} px`);
            return;
          }
        };

        this.imagePreview.src = reader.result;
        this.newCompanyFormGroup.patchValue({logo: this.imagePreview.src});
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
    this.newCompanyFormGroup.patchValue({logo: ''});
  }

}
