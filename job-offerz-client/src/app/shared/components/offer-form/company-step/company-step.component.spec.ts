import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStepComponent } from './company-step.component';

describe('CompanyStepComponent', () => {
  let component: CompanyStepComponent;
  let fixture: ComponentFixture<CompanyStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
