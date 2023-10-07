import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyordersDetailComponent } from './myorders-detail.component';

describe('MyordersDetailComponent', () => {
  let component: MyordersDetailComponent;
  let fixture: ComponentFixture<MyordersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyordersDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyordersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
