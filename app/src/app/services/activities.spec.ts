import { TestBed } from '@angular/core/testing';

import { Activities } from './activities';

describe('Activities', () => {
  let service: Activities;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Activities);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
