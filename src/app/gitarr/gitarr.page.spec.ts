import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GitarrPage } from './gitarr.page';

describe('GitarrPage', () => {
  let component: GitarrPage;
  let fixture: ComponentFixture<GitarrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GitarrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
