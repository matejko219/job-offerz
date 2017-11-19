import { TestBed, inject } from '@angular/core/testing';

import { FavoriteOfferService } from './favorite-offer.service';

describe('FavoriteOfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteOfferService]
    });
  });

  it('should be created', inject([FavoriteOfferService], (service: FavoriteOfferService) => {
    expect(service).toBeTruthy();
  }));
});
