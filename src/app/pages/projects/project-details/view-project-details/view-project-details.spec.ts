import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectDetails } from './view-project-details';

describe('ViewProjectDetails', () => {
  let component: ViewProjectDetails;
  let fixture: ComponentFixture<ViewProjectDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProjectDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProjectDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
