import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFacilities } from './edit-facilities';

describe('EditFacilities', () => {
  let component: EditFacilities;
  let fixture: ComponentFixture<EditFacilities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFacilities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFacilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
