import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TryToWatchDialogComponent } from './try-to-watch-dialog.component';

describe('TryToWatchDialogComponent', () => {
  let component: TryToWatchDialogComponent;
  let fixture: ComponentFixture<TryToWatchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TryToWatchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TryToWatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
