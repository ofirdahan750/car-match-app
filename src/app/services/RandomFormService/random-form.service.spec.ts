import { TestBed } from '@angular/core/testing';

import { RandomFormService } from './random-form.service';

describe('RandomFormService', () => {
  let service: RandomFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
