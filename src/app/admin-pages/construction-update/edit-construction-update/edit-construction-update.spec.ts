import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConstructionUpdate } from './edit-construction-update';

describe('EditConstructionUpdate', () => {
  let component: EditConstructionUpdate;
  let fixture: ComponentFixture<EditConstructionUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditConstructionUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConstructionUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
