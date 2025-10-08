import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegions } from './view-regions';

describe('ViewRegions', () => {
  let component: ViewRegions;
  let fixture: ComponentFixture<ViewRegions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRegions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRegions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
