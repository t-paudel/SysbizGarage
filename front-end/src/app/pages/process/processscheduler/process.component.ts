import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
  selector: 'hr-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.css'],
})
export class ProcessComponent implements OnInit, AfterViewChecked {

  
  // form: FormGroup;
  file: File;
  private rowSelection = "single";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  columnDefs = [
    { headerName: 'Process Name', field: 'feedName' },
    //{headerName: 'Feed Id', field: 'feedId' },
   // { headerName: 'Category Name', field: 'categoryName' },
   // { headerName: 'Active', field: 'active' },
    {headerName: 'Last Run', field: 'startTime'},
  ];
  columnDefs1 = [
    { headerName: 'Process Name', field: 'feedName'},
    { headerName: 'Status', field: 'status'},
    { headerName: 'Start Date', field: 'startDate'},
    { headerName: 'End Date', field: 'endDate'},
    { headerName: 'Frequency', field: 'frequency'},
    { headerName: 'Last Run Date', field: 'lastRun'},
    { headerName: 'Modified Date', field: 'modifiedDate'},
    { headerName: 'Modified By', field: 'modifiedBy'},
    //{headerName: 'Feed Id', field: 'feedId' },
   // { headerName: 'Category Name', field: 'categoryName' },
   // { headerName: 'Active', field: 'active' },
    
  ];
  private gridApi;
  private gridApi1;
  rowData: any = [];
  rowData1: any = [];
  filename: string;
  feedId: string;
  flag = false;
  flag1 = false;
  public se = false;
  public companystartdatevalid = false;
  private first: string = "<<";
  private previous: string = "<";
  private last: string = ">>";
  private next: string = ">";
  private totalPages = 1;
  private pageNumber = 1;
  private pageSize = 10;
  private temp = 10;
  totalPages1 =1;
  pageNumber1 =1;
  pageSize1 =10;
  temp1 = 10;
  data:any=null;
  frequency: any;
  constructor(
    private http: HttpClient,public fb: FormBuilder
  ) {
  // this.form = new FormGroup({
  //   companyStartDateTab: new FormControl('', Validators.required),
  //   companyEndDateTab: new FormControl(),
  // });
  }
  ngOnInit() {
  //   this.form = this.fb.group({
  //     processName: ['', Validators.required],
  //     frequency: ['', Validators.required],
  // });

    //this.http.get('/api/checkkylo', { responseType: 'json' }).subscribe((main: any) => {
    //  for (var i = 0; i < main.data.length; i++) {
       // this.rowData.push({ 'feedName': main.data[i].feedName, 'feedId': main.data[i].feedId, 'categoryName': main.data[i].categoryName, 'active': main.data[i].active });
     //   this.feedIdArray.push(main.data[i].feedId);
    //    console.log(main.data[i].feedName);
    //  }
   // }); 
      this.http.get('/api/checkkylo', { responseType: 'json' }).subscribe((main: any) => {
        console.log(main.feeds.length);
        for (var i = 0; i < main.feeds.length; i++) {
          this.rowData.push({ 'feedName': main.feeds[i].feed.split('.')[1].toUpperCase(), 'feedId': main.feeds[i].feedId,'startTime': new Date(main.feeds[i].lastOpFeed.startTime).getMonth()+1+"/"+new Date(main.feeds[i].lastOpFeed.startTime).getDate()+"/"+new Date(main.feeds[i].lastOpFeed.startTime).getFullYear()+"  "+new Date(main.feeds[i].lastOpFeed.startTime).getHours()+":"+new Date(main.feeds[i].lastOpFeed.startTime).getMinutes()+":"+new Date(main.feeds[i].lastOpFeed.startTime).getSeconds()});//'categoryName': main.data[i].categoryName, 'active': main.data[i].active });
         // console.log(main.data[i].feedName);
        }
    });
    console.log(this.rowData);
    this.http.get('/api/schedulerJobs', { responseType: 'json' }).subscribe((main: any) => {
      console.log(main.length);
      for (var i = 0; i < main.length; i++) {
        if(main[i].jobIdentifier.group!=='KYLO')
        this.rowData1.push({ 'feedName': main[i].jobIdentifier.name.toUpperCase(),'status':'Active','startDate':'','endDate':'','frequency':'Time','lastRun':main[i].previousFireTime,});//, 'feedId': main.feeds[i].feedId,'startTime': new Date(main.feeds[i].lastOpFeed.startTime).getMonth()+1+"/"+new Date(main.feeds[i].lastOpFeed.startTime).getDate()+"/"+new Date(main.feeds[i].lastOpFeed.startTime).getFullYear()+"  "+new Date(main.feeds[i].lastOpFeed.startTime).getHours()+":"+new Date(main.feeds[i].lastOpFeed.startTime).getMinutes()+":"+new Date(main.feeds[i].lastOpFeed.startTime).getSeconds()});//'categoryName': main.data[i].categoryName, 'active': main.data[i].active });
       // console.log(main.data[i].feedName);
      }
  });
  }


  getFiles(event) {
    console.log(event.target.files);
    this.file = event.target.files[0];
    this.filename = event.target.files[0].name;
  }
  uploadFile() {

    const formData: FormData = new FormData();
    formData.append('file', this.file, this.file.name);
    formData.append('feedId', this.feedId);
    console.log(this.feedId);
    console.log(formData);
    this.http.post('/api/postFile', formData, { responseType: 'json' }).subscribe((data) => {
      console.log(data);
    });
  }

  test() {
    this.http.get('api/checkkylo', { headers: this.headers }).subscribe();
  }
  fileRead() {
    const formData: FormData = new FormData();
    formData.append('feedId', this.feedId);
    console.log(this.feedId);
    console.log(formData);
    this.http.post('api/startFeed', formData, { responseType: 'json' }).subscribe((data) => {
      console.log(data);
      if (data === 200) {
        this.se = true;
      }
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    if (this.gridApi.paginationGetTotalPages() === 0) {
      this.totalPages = 1;
    }
    else {
      this.totalPages = this.gridApi.paginationGetTotalPages();
    }
    this.pageNumber = this.gridApi.paginationGetCurrentPage() + 1;

    this.gridApi.setRowData([]);
  }
  onGridReady1(params) {
    this.gridApi1= params.api;
    this.gridApi1.setRowData([]);
  }
  ngAfterViewChecked() {
    this.addRows();
    this.addRows1();
  }

  addRows() {
    if (this.gridApi != undefined && this.flag === false && this.rowData.length > 0) {
      // for(var i=0;i<this.rowData.length;i++){

      this.gridApi.updateRowData({ add: this.rowData });
      this.flag = true;
      // }


    }
  }
  addRows1() {
    if (this.gridApi1 != undefined && this.flag1 === false && this.rowData1.length > 0) {
      // for(var i=0;i<this.rowData.length;i++){

      this.gridApi1.updateRowData({ add: this.rowData1 });
      this.flag1 = true;
      // }


    }
  }
  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.feedId;
    });
    // document.querySelector("#selectedRows").innerHTML = selectedRowsString;
    console.log(selectedRowsString);
    this.feedId = selectedRowsString;
  }

  onSelectionChanged1() {
    var selectedRows = this.gridApi1.getSelectedRows();
   // var selectedRowsString = "";
    this.data=selectedRows;
    console.log(this.data);
    this.load();
    this.load1();
    //selectedRows.forEach(function (selectedRow, index) {
    //  if (index !== 0) {
     //   selectedRowsString += ", ";
    ///  }
    //  selectedRowsString += selectedRow.feedId;
   // });
    // document.querySelector("#selectedRows").innerHTML = selectedRowsString;
    //console.log(selectedRowsString);
    //this.feedId = selectedRowsString;
  }
  run() {
    if (this.gridApi1.getSelectedRows().length == 1 && this.file != null) {
      this.fileRead();
    }
  }
  onCloseClick() {
    this.se = false;
  }
  option = [
    { value: 'interval', viewValue: 'Interval' },
    { value: 'time', viewValue: 'Time' }
  ];
  statuses = [
    { value: 'active', viewValue: 'Active' },
    { value: 'inactive', viewValue: 'Inactive' }
  ];
  /*  StartDateChange(value) {
        console.log(value);
        console.log('inside on change');

        for (const key in this.form.controls) {

          if (key === 'companyStartDateTab') {
            const control: FormControl = <FormControl>this.form.controls[key];
            if (control.value !== null) {
              this.companystartdatevalid = false;
            }else {
              this.companystartdatevalid = true;
            }
          }
        }
      }*/
      fetchPage1(Number) {
        this.gridApi1.paginationGoToPage(Number - 1);
      }
      onPaginationChanged1() {
        console.log("onPaginationPageLoaded");
        if (this.gridApi1) {
          if (this.gridApi1.paginationGetTotalPages() === 0) {
            this.totalPages1 = 1;
          }
          else {
            this.totalPages1 = this.gridApi1.paginationGetTotalPages();
            console.log(this.totalPages1);
          }
          this.pageNumber1 = this.gridApi1.paginationGetCurrentPage() + 1;
          this.gridApi1.sizeColumnsToFit();
        }
      }
    
      onPageSizeChanged1(newPageSize) {
        
        if(newPageSize<10){
            this.pageSize1=10;
        }
        
       else{
          this.gridApi1.paginationSetPageSize(Number(this.pageSize1));
          this.pageSize1 = Number(newPageSize);
          this.onPaginationChanged();
          this.temp1 = Number(newPageSize);
          console.log(this.temp1);
       }
       console.log(this.pageSize1);
          //newPageSize=10;
          //this.gridApi.paginationSetPageSize(Number(10));
          //this.pageSize=10;
         // this.onPaginationChanged();
         // console.log(this.pageSize);
        }
      
      onBtFirst1() {
         this.pageNumber1 = 1;
        this.gridApi1.paginationGoToFirstPage();
      }
    
      onBtLast1() {
         this.pageNumber1 = this.totalPages1;
        this.gridApi1.paginationGoToLastPage();
      }
    
      onBtNext1() {
        this.gridApi1.paginationGoToNextPage();
         this.pageNumber1 = this.gridApi1.paginationGetCurrentPage() + 1;
      }
    
      onBtPrevious1() {
        this.gridApi1.paginationGoToPreviousPage();
         this.pageNumber1 = this.gridApi1.paginationGetCurrentPage()+1;
        console.log(this.pageNumber1);
        console.log(this.gridApi1.paginationGetCurrentPage());
        console.log(this.gridApi1.paginationGetCurrentPage() - 1);
      }
      fetchPage(Number) {
        this.gridApi.paginationGoToPage(Number - 1);
      }
      onPaginationChanged() {
        console.log("onPaginationPageLoaded");
        if (this.gridApi) {
          if (this.gridApi.paginationGetTotalPages() === 0) {
            this.totalPages = 1;
          }
          else {
            this.totalPages = this.gridApi.paginationGetTotalPages();
            console.log(this.totalPages);
          }
          this.pageNumber = this.gridApi.paginationGetCurrentPage() + 1;
          this.gridApi.sizeColumnsToFit();
        }
      }
    
      onPageSizeChanged(newPageSize) {
        
        if(newPageSize<10){
            this.pageSize=10;
        }
        
       else{
          this.gridApi.paginationSetPageSize(Number(this.pageSize));
          this.pageSize = Number(newPageSize);
          this.onPaginationChanged();
          this.temp = Number(newPageSize);
          console.log(this.temp);
       }
       console.log(this.pageSize);
          //newPageSize=10;
          //this.gridApi.paginationSetPageSize(Number(10));
          //this.pageSize=10;
         // this.onPaginationChanged();
         // console.log(this.pageSize);
        }
      
      onBtFirst() {
         this.pageNumber = 1;
        this.gridApi.paginationGoToFirstPage();
      }
    
      onBtLast() {
         this.pageNumber = this.totalPages;
        this.gridApi.paginationGoToLastPage();
      }
    
      onBtNext() {
        this.gridApi.paginationGoToNextPage();
         this.pageNumber = this.gridApi.paginationGetCurrentPage() + 1;
      }
    
      onBtPrevious() {
        this.gridApi.paginationGoToPreviousPage();
         this.pageNumber = this.gridApi.paginationGetCurrentPage()+1;
        console.log(this.pageNumber);
        console.log(this.gridApi.paginationGetCurrentPage());
        console.log(this.gridApi.paginationGetCurrentPage() - 1);
      }

      load(){
        if(this.data!==undefined && this.data!==null)
        {
          return this.data[0].feedName;
        }
        else{
          return '';
        }
      }
      load1(){
        if(this.data!==undefined && this.data!==null)
        {
          if(this.data[0].frequency==='Time')
          {
            this.frequency="1";
          }
          else if(this.data[0].frequency==='Interval')
          {
            this.frequency="2";
          }
        }
        else{
          return '';
        }
      }
}
