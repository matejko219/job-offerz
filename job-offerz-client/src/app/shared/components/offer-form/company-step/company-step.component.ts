import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {SnackBarService} from "../../../services/snack-bar.service";

@Component({
  selector: 'app-company-step',
  templateUrl: './company-step.component.html',
  styleUrls: ['./company-step.component.scss']
})
export class CompanyStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  newCompanyFormGroup: FormGroup;

  @ViewChild('imageInput')
  imageInput: ElementRef;

  @Input('companyIdCtrl')
  companyIdCtrl: FormControl;

  companies = [
    {id: 1, name: 'Comarch S.A.'},
    {id: 2, name: 'PGS Software'},
    {id: 3, name: 'Ailleron S.A.'}
  ];

  filteredCompanies: Observable<any>;

  showCompanyForm: boolean = false;

  imagePreview;

  maxFileSize = 25;
  maxWidth = 200;
  maxHeight = 200;

  constructor(private formBuilder: FormBuilder, private snackBarService: SnackBarService) {

  }

  ngOnInit() {

    this.filteredCompanies = this.companyIdCtrl.valueChanges
      .startWith(null)
      .map(companyName => companyName ? this.filterCompanies(companyName) : this.companies.slice());

    this.newCompanyFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      logoCtrl: ['']
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
    this.newCompanyFormGroup.patchValue({nameCtrl: companyName});
    this.showCompanyForm = true;
  }

  addCompany() {
    this.companyIdCtrl.setValue({id: 1, name: this.newCompanyFormGroup.get('nameCtrl').value});
    const companyId = this.newCompanyFormGroup.get('nameCtrl').value;
    this.showCompanyForm = false;
  }

  cancelAdd() {
    this.newCompanyFormGroup.patchValue({nameCtrl: '', logoCtrl: ''});
    this.showCompanyForm = false;
    this.imagePreview = null;
  }

  loadImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        this.imagePreview = new Image();

        this.imagePreview.onload = (imageEvent) => {
          if (this.imagePreview.width > this.maxWidth || this.imagePreview.height > this.maxHeight) {
            this.handleImageError(`Dozwolone wymiary to ${this.maxWidth}x${this.maxHeight} px`);
            return;
          }
        };

        this.imagePreview.src = reader.result;
      };

      const imageFile = event.target.files[0];

      if (!imageFile.type.startsWith('image/')) {
        this.handleImageError('Dozwolone tylko pliki graficzne');

      } else if (imageFile.size > (this.maxFileSize * 1024)) {
        this.handleImageError(`Dozwolony rozmiar to maks. ${this.maxFileSize}KB`);

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
  }

}
