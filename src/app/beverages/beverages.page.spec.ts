import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeveragesPage } from './beverages.page';

describe('BeveragesPage', () => {
  let component: BeveragesPage;
  let fixture: ComponentFixture<BeveragesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BeveragesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
