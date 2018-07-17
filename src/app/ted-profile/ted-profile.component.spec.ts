import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TedProfileComponent } from './ted-profile.component';

describe('TedProfileComponent', () => {
  let component: TedProfileComponent;
  let fixture: ComponentFixture<TedProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TedProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
