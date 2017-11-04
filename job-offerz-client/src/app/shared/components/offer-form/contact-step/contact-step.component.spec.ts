import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactStepComponent } from './contact-step.component';

describe('ContactStepComponent', () => {
  let component: ContactStepComponent;
  let fixture: ComponentFixture<ContactStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
