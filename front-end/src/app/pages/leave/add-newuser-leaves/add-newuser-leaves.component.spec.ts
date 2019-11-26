import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewuserLeavesComponent } from './add-newuser-leaves.component';

describe('AddNewuserLeavesComponent', () => {
  let component: AddNewuserLeavesComponent;
  let fixture: ComponentFixture<AddNewuserLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewuserLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewuserLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
