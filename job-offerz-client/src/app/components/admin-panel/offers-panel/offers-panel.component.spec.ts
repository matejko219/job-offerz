import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersPanelComponent } from './offers-panel.component';

describe('OffersPanelComponent', () => {
  let component: OffersPanelComponent;
  let fixture: ComponentFixture<OffersPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
