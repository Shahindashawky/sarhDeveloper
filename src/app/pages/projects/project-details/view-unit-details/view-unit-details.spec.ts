import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnitDetails } from './view-unit-details';

describe('ViewUnitDetails', () => {
  let component: ViewUnitDetails;
  let fixture: ComponentFixture<ViewUnitDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewUnitDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUnitDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
