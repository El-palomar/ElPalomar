import { TestBed } from '@angular/core/testing';

import { QuienesSomos } from './quienes-somos';

describe('QuienesSomos', () => {
  let service: QuienesSomos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuienesSomos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
