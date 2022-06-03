import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyUsageComponent } from './daily-usage.component';

describe('DailyUsageComponent', () => {
  let component: DailyUsageComponent;
  let fixture: ComponentFixture<DailyUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyUsageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
