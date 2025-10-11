import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConstructionUpdate } from './create-construction-update';

describe('CreateConstructionUpdate', () => {
  let component: CreateConstructionUpdate;
  let fixture: ComponentFixture<CreateConstructionUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateConstructionUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConstructionUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
