import { TestBed, inject } from '@angular/core/testing';

import { OnlyLoggedOut } from './only-logged-out.service';

describe('OnlyLoggedOut', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyLoggedOut]
    });
  });

  it('should be created', inject([OnlyLoggedOut], (service: OnlyLoggedOut) => {
    expect(service).toBeTruthy();
  }));
});
