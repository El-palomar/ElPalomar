import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioActividades } from './formulario-actividades';

describe('FormularioActividades', () => {
  let component: FormularioActividades;
  let fixture: ComponentFixture<FormularioActividades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioActividades]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioActividades);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
