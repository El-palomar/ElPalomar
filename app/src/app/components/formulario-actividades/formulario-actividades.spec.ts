import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioActividadesComponent } from './formulario-actividades';

describe('FormularioActividades', () => {
  let component: FormularioActividadesComponent;
  let fixture: ComponentFixture<FormularioActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioActividadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
