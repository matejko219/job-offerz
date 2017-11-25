import { TestBed, inject } from '@angular/core/testing';

import { OnlyAdmin } from './only-admin.service';

describe('OnlyAdmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyAdmin]
    });
  });

  it('should be created', inject([OnlyAdmin], (service: OnlyAdmin) => {
    expect(service).toBeTruthy();
  }));
});
