import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TedCenterComponent } from './ted-center.component';

describe('TedCenterComponent', () => {
  let component: TedCenterComponent;
  let fixture: ComponentFixture<TedCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TedCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TedCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
