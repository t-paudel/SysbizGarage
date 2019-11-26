import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-date-overlap-dialog-box',
  templateUrl: './date-overlap-dialog-box.component.html',
  styleUrls: ['./date-overlap-dialog-box.component.scss']
})
export class DateOverlapDialogBoxComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DateOverlapDialogBoxComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
