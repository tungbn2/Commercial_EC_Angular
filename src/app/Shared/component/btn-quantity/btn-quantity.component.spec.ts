import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnQuantityComponent } from './btn-quantity.component';

describe('BtnQuantityComponent', () => {
  let component: BtnQuantityComponent;
  let fixture: ComponentFixture<BtnQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
