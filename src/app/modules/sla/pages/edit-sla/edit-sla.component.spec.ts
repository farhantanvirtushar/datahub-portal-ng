import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSlaComponent } from './edit-sla.component';

describe('EditSlaComponent', () => {
  let component: EditSlaComponent;
  let fixture: ComponentFixture<EditSlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSlaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
