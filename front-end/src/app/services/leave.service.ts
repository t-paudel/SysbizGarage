import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplyLeave } from '../pages/leave/model/apply-leave';
import { AvailCompOff } from '../pages/leave/model/avail-comp-off';
import { AvailableLeaves } from '../pages/leave/model/available-leaves';
import { LeaveHistory } from '../pages/leave/model/leave-history';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}
  
  getAvailableLeaves(employeeId:string)
  {
    return this.http.post('/api/leaves/getLeaves',employeeId,{headers:this.headers});
  }

  applyLeave(applyLeave:ApplyLeave)
  {
    return this.http.post('/api/leaves/applyLeave',applyLeave,{headers:this.headers});
  }

  getLeaveHistory(employeeId:string)
  {
    return this.http.post("/api/leaves/getHistory", employeeId, { headers: this.headers });
  }

  availCompOff(compOff:AvailCompOff)
  {
    return this.http.post("/api/leaves/availCompOff",compOff,{headers:this.headers});
  }

  addNewUserLeaves(leaves:AvailableLeaves)
  {
    return this.http.post('/api/leaves/setLeavesForNewUser',leaves,{headers:this.headers});
  }

  getAppliedLeaves(employeeId:string)
  {
    return this.http.post('/api/leaves/getAppliedLeaves',employeeId,{headers:this.headers});
  }

  getPendingNotifications(supervisorId:string)
  {
    return this.http.post('/api/leaves/getPendingNotifications',supervisorId,{headers:this.headers});
  }

  approveRequest(request:LeaveHistory)
  {
    return this.http.post('/api/leaves/approveRequest',request,{headers:this.headers});
  }

  rejectRequest(request:LeaveHistory)
  {
    return this.http.post('/api/leaves/rejectRequest',request,{headers:this.headers});
  }
}
