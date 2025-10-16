import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionDetails } from './construction-details';

describe('ConstructionDetails', () => {
  let component: ConstructionDetails;
  let fixture: ComponentFixture<ConstructionDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConstructionDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructionDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
