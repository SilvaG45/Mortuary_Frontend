import { TestBed } from '@angular/core/testing';

import { BeneficiarieService } from './beneficiarie.service';

describe('BeneficiarieService', () => {
  let service: BeneficiarieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiarieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
