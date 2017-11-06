import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsBonusesStepComponent } from './terms-bonuses-step.component';

describe('TermsBonusesStepComponent', () => {
  let component: TermsBonusesStepComponent;
  let fixture: ComponentFixture<TermsBonusesStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsBonusesStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsBonusesStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
