import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusesStepComponent } from './bonuses-step.component';

describe('BonusesStepComponent', () => {
  let component: BonusesStepComponent;
  let fixture: ComponentFixture<BonusesStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusesStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusesStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
