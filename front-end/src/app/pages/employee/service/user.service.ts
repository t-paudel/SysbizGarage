import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserPersonalDetails } from '../model/user-personal-details';
import { UserOrganizationDetails } from '../model/user-organization-details';
import { UserMapping } from '../model/user-mapping';
import { RoleMapping } from '../model/role-mapping';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private headers = new HttpHeaders({'Content-Type':'application/json'}) ;

  saveUserPersonalDetails(user:UserPersonalDetails)
  {
    return this.http.post('/api/users/saveUserPersonalDetails',user,({headers : this.headers}));
  }

  saveUserOrganizationDetails(user:UserOrganizationDetails)
  {
    return this.http.post('/api/users/saveUserOrganizationDetails',user,({headers : this.headers}));
  }

  saveUserMappingDetails(user:UserMapping)
  {
    return this.http.post('/api/users/saveUserMappingDetails',user,({headers : this.headers}));
  }

  saveUserRoleMappingDetails(user:RoleMapping)
  {
    return this.http.post('/api/users/saveRoleMappingDetails',user,({headers : this.headers}));
  }

  getRoleNames()
  {
    return this.http.get('/api/users/getRoleNames',({headers : this.headers}));
  }
  
  getEmployeeList(role:string)
  {
    return this.http.get('api/users/getEmployeeType/' + role ,({headers : this.headers}));
  }

  getUnmappedUserList()
  {
    return this.http.get('/api/users/getUnmappedUsers',({headers : this.headers}));
  }
}
