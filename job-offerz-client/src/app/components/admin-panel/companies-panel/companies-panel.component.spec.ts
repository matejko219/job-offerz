import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesPanelComponent } from './companies-panel.component';

describe('CompaniesPanelComponent', () => {
  let component: CompaniesPanelComponent;
  let fixture: ComponentFixture<CompaniesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
