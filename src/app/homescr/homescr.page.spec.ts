import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomescrPage } from './homescr.page';

describe('HomescrPage', () => {
  let component: HomescrPage;
  let fixture: ComponentFixture<HomescrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomescrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
