import { TestBed } from '@angular/core/testing';

import { GardenDataService } from './garden-data.service';

describe('GardenDataService', () => {
  let service: GardenDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardenDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
