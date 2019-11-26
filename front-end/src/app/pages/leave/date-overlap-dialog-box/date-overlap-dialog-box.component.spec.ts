import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateOverlapDialogBoxComponent } from './date-overlap-dialog-box.component';

describe('DateOverlapDialogBoxComponent', () => {
  let component: DateOverlapDialogBoxComponent;
  let fixture: ComponentFixture<DateOverlapDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateOverlapDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateOverlapDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
