import { TestBed, inject } from '@angular/core/testing';

import { OnlyLoggedIn } from './only-logged-in.service';

describe('OnlyLoggedIn', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyLoggedIn]
    });
  });

  it('should be created', inject([OnlyLoggedIn], (service: OnlyLoggedIn) => {
    expect(service).toBeTruthy();
  }));
});
