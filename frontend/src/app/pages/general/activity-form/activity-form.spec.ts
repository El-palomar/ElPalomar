import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityForm } from './activity-form';

describe('ActivityForm', () => {
  let component: ActivityForm;
  let fixture: ComponentFixture<ActivityForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
