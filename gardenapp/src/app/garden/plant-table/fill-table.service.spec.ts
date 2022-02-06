import { TestBed } from '@angular/core/testing';

import { FillTableService } from './fill-table.service';

describe('FillTableService', () => {
  let service: FillTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
