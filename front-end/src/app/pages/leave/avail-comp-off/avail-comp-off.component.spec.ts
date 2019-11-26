import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailCompOffComponent } from './avail-comp-off.component';

describe('AvailCompOffComponent', () => {
  let component: AvailCompOffComponent;
  let fixture: ComponentFixture<AvailCompOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailCompOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailCompOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
