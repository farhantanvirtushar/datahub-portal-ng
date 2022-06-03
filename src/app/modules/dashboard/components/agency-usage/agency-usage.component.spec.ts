import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyUsageComponent } from './agency-usage.component';

describe('AgencyUsageComponent', () => {
  let component: AgencyUsageComponent;
  let fixture: ComponentFixture<AgencyUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyUsageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
