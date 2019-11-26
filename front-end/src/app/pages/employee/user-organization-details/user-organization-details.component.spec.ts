import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrganizationDetailsComponent } from './user-organization-details.component';

describe('UserOrganizationDetailsComponent', () => {
  let component: UserOrganizationDetailsComponent;
  let fixture: ComponentFixture<UserOrganizationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrganizationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrganizationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
