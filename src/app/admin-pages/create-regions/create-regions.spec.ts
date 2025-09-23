import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRegions } from './create-regions';

describe('CreateRegions', () => {
  let component: CreateRegions;
  let fixture: ComponentFixture<CreateRegions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRegions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRegions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
