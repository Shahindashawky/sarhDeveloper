import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Drawer } from './drawer';

describe('Drawer', () => {
  let component: Drawer;
  let fixture: ComponentFixture<Drawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Drawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Drawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
