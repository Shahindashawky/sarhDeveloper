import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegions } from './edit-regions';

describe('EditRegions', () => {
  let component: EditRegions;
  let fixture: ComponentFixture<EditRegions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRegions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRegions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
