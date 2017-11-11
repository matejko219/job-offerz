import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsStepComponent } from './requirements-step.component';

describe('RequirementsStepComponent', () => {
  let component: RequirementsStepComponent;
  let fixture: ComponentFixture<RequirementsStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementsStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
