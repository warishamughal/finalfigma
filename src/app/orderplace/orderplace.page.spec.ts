import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderplacePage } from './orderplace.page';

describe('OrderplacePage', () => {
  let component: OrderplacePage;
  let fixture: ComponentFixture<OrderplacePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderplacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
