import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConstructionUpdate } from './view-construction-update';

describe('ViewConstructionUpdate', () => {
  let component: ViewConstructionUpdate;
  let fixture: ComponentFixture<ViewConstructionUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewConstructionUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewConstructionUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
