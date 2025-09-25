import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Followup } from './followup';

describe('Followup', () => {
  let component: Followup;
  let fixture: ComponentFixture<Followup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Followup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Followup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
