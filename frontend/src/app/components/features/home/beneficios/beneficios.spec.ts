import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Beneficios } from './beneficios';

describe('Beneficios', () => {
  let component: Beneficios;
  let fixture: ComponentFixture<Beneficios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Beneficios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Beneficios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
