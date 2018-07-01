import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfingCenterComponent } from './surfing-center.component';

describe('SurfingCenterComponent', () => {
  let component: SurfingCenterComponent;
  let fixture: ComponentFixture<SurfingCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurfingCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurfingCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
