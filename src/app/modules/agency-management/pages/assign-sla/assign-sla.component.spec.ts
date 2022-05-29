import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSlaComponent } from './assign-sla.component';

describe('AssignSlaComponent', () => {
  let component: AssignSlaComponent;
  let fixture: ComponentFixture<AssignSlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignSlaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
