import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUnits } from './create-units';

describe('CreateUnits', () => {
  let component: CreateUnits;
  let fixture: ComponentFixture<CreateUnits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUnits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUnits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
