import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionDetails } from './region-details';

describe('RegionDetails', () => {
  let component: RegionDetails;
  let fixture: ComponentFixture<RegionDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegionDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
