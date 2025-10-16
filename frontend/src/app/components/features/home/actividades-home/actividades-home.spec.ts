import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesHome } from './actividades-home';

describe('ActividadesHome', () => {
  let component: ActividadesHome;
  let fixture: ComponentFixture<ActividadesHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
