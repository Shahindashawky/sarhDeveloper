import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFacilities } from './view-facilities';

describe('ViewFacilities', () => {
  let component: ViewFacilities;
  let fixture: ComponentFixture<ViewFacilities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFacilities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFacilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
