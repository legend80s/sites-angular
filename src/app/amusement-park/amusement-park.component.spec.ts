import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmusementParkComponent } from './amusement-park.component';

describe('AmusementParkComponent', () => {
  let component: AmusementParkComponent;
  let fixture: ComponentFixture<AmusementParkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmusementParkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmusementParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
