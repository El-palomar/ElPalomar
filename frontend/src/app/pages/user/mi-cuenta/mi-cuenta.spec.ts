import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCuenta } from './mi-cuenta';

describe('MiCuenta', () => {
  let component: MiCuenta;
  let fixture: ComponentFixture<MiCuenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiCuenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiCuenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
