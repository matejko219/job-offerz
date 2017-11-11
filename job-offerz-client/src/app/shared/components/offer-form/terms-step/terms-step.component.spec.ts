import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsStepComponent } from './terms-step.component';

describe('TermsStepComponent', () => {
  let component: TermsStepComponent;
  let fixture: ComponentFixture<TermsStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
