import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridItems } from '../dto/grid-items';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit 
{
  items:GridItems[] = [
    {itemName:'Personal Details',itemUrl:'/employee/user-personal-details'},
    {itemName:'Organization Details',itemUrl:'/employee/user-organization-details'},
    {itemName:'User Mapping',itemUrl:'/employee/user-mapping'},
    {itemName:'Role Mapping',itemUrl:'/employee/role-mapping'}
  ];

  
  constructor(private router:Router) { }

  ngOnInit() {
  }

  clicked(i)
  {
    console.log('clicked()');
      this.router.navigate([this.items[i].itemUrl]);
    
  }
}
