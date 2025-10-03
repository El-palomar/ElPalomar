import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCuentaEditar } from './mi-cuenta-editar';

describe('MiCuentaEditar', () => {
  let component: MiCuentaEditar;
  let fixture: ComponentFixture<MiCuentaEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiCuentaEditar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiCuentaEditar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
