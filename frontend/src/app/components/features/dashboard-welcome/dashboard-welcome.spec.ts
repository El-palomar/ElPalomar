import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWelcome } from './dashboard-welcome';

describe('DashboardWelcome', () => {
  let component: DashboardWelcome;
  let fixture: ComponentFixture<DashboardWelcome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardWelcome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardWelcome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
