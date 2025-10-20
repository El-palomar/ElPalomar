import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsProfesores } from './cards-profesores';

describe('CardsProfesores', () => {
  let component: CardsProfesores;
  let fixture: ComponentFixture<CardsProfesores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsProfesores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsProfesores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
