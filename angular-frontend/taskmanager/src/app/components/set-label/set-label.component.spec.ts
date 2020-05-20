import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLabelComponent } from './set-label.component';

describe('SetLabelComponent', () => {
  let component: SetLabelComponent;
  let fixture: ComponentFixture<SetLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
