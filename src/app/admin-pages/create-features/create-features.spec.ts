import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeatures } from './create-features';

describe('CreateFeatures', () => {
  let component: CreateFeatures;
  let fixture: ComponentFixture<CreateFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateFeatures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFeatures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
