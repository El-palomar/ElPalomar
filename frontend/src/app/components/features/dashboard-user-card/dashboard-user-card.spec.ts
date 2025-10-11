import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserCard } from './dashboard-user-card';

describe('DashboardUserCard', () => {
  let component: DashboardUserCard;
  let fixture: ComponentFixture<DashboardUserCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUserCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUserCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
