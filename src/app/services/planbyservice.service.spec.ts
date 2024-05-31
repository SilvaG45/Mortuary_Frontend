import { TestBed } from '@angular/core/testing';

import { PlanbyserviceService } from './planbyservice.service';

describe('PlanbyserviceService', () => {
  let service: PlanbyserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanbyserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
