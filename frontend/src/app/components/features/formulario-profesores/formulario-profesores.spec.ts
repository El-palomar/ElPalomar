import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioProfesores } from './formulario-profesores';

describe('FormularioProfesores', () => {
  let component: FormularioProfesores;
  let fixture: ComponentFixture<FormularioProfesores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioProfesores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioProfesores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
