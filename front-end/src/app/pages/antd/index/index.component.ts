import { Component, ViewChild, SimpleChanges, Input, Output, EventEmitter } from '@angular/core'
import { MatSelectionList, MatListOption } from '@angular/material';
import * as moment from 'moment';
import * as _ from 'lodash';
import { SelectionModel } from '@angular/cdk/collections';
import { strict } from 'assert';
declare var require: any
const data: any = require('./data.json')
export interface CalendarDate {
  mDate?: moment.Moment;
  selected?: boolean;
  today?: boolean;
}
export interface Events {
  mDate: moment.Moment;
  events: string[];
}
@Component({
  selector: 'app-antd-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class AntdIndexComponent {
  selectedDate: CalendarDate[] = [];
  typesOfShoes: any[] = [
    { "id": "1", "name": "abc", "color": "red" },
    { "id": "2", "name": "def", "color": "blue" },
    { "id": "3", "name": "ghi", "color": "green" },
    { "id": "4", "name": "def", "color": "yellow" },
    { "id": "5", "name": "xyz", "color": "red" },
  ];
  @ViewChild(MatSelectionList) selectionList: MatSelectionList;
  eventDate: CalendarDate;
  month=false;
  year=false;
  day=false;
  ngOnInit() {
    const date: CalendarDate = {
      today: false,
      selected: false,
      mDate: moment("2019-05-01 00:00").local(),
    };
    console.log(date);
    this.selectedDate.push(date);
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.generateCalendar();
  }
  events1: Events[] = [];
  events = "";
  event: string[] = [];
  currentDate = moment();
  dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  viewName: string;
  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
      changes.selectedDates.currentValue &&
      changes.selectedDates.currentValue.length > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
    }
  }

  // date checkers

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month') && !this.isSelectedWeekEnd(date);
  }
  isSelectedWeekEnd(date: moment.Moment): boolean {
    return moment(date).isoWeekday() === 6 || moment(date).isoWeekday() === 7 || this.addHoliday(date);
  }

  selectDate(date: CalendarDate): void {
    // this.reloadDates(this.currentDate,date);
    // this.onSelectDate.emit(date);
    this.event=[];
    var build:string='';
    console.log(date);
    this.eventDate = date;
    this.generateCalendar1(date);
    for(var i =0;i< this.events1.length;i++){
      if(date.mDate.isSame(this.events1[i].mDate))
      {
        for(var j=0;j<this.events1[i].events.length;j++)
        {
          if(build==='')
          {
            build=this.events1[i].events[j];
          }
          else{
          build=build+','+this.events1[i].events[j];
          }
        }
      }
    }
     this.events=build;
    
  }

  // actions from calendar

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
  }

  // generate the calendar grid

  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
      .map((date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d),
          selected: this.isSelected(d),
          mDate: d,
        };


      });
  }
  reloadDates(currentMoment: moment.Moment, date1: CalendarDate): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
      .map((date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);

        if (d.isSame(date1.mDate)) {
          return {
            today: this.isToday(d),
            selected: true,
            mDate: d,
          };
        }
        else {
          return {
            today: this.isToday(d),
            selected: false,
            mDate: d,
          };
        }
      });
  }
  generateCalendar1(date1: CalendarDate): void {
    const dates = this.reloadDates(this.currentDate, date1);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  views = [
    { value: 'month', viewValue: 'Month' },
    { value: 'year', viewValue: 'Year' },
    { value: 'day', viewValue: 'Day' }
  ];
  addHoliday(date: moment.Moment) {
    if (this.selectedDate !== null && this.selectedDate !== undefined && typeof (this.selectedDate) !== 'undefined') {
      for (var i = 0; i < this.selectedDate.length; i++) {
        if (date.isSame(this.selectedDate[i].mDate)) {
          return true;
        }
      }
    }
  }
  addEvent() {

    // this.generateCalendar2(this.eventDate,this.events);

    console.log(this.events);
    this.event.push(this.events);
    this.events1.push({ mDate: this.eventDate.mDate, events: this.event });
    console.log(this.events1);

  }
  
  // generateCalendar2(date1: CalendarDate,events:string): void {
  //   const dates = this.reloadDatesWithEvents(this.currentDate, date1,events);
  //   const weeks: CalendarDate[][] = [];
  //   while (dates.length > 0) {
  //     weeks.push(dates.splice(0, 7));
  //   }
  //   this.weeks = weeks;
  // }
  // reloadDatesWithEvents(currentMoment: moment.Moment, date1: CalendarDate,events1: string): CalendarDate[] {

  //   const firstOfMonth = moment(currentMoment).startOf('month').day();
  //   const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
  //   const start = firstDayOfGrid.date();
  //   return _.range(start, start + 42)
  //     .map((date: number): CalendarDate => {
  //       const d = moment(firstDayOfGrid).date(date);

  //       if (d.isSame(date1.mDate)) {
  //         return {
  //           today: this.isToday(d),
  //           selected: true,
  //           mDate: d,
  //         };
  //       }
  //       else {
  //         return {
  //           today: this.isToday(d),
  //           selected: false,
  //           mDate: d,
  //         };
  //       }
  //     });
  // }
  onChange()
  {
     console.log(this.viewName);
     if(this.viewName==='month')
     {
       this.month=true;
       this.day=false;
       this.year=false;
     }
     else if(this.viewName==='year'){
       this.year=true;
       this.month=false;
       this.day=false;
     }
     else if(this.viewName==='day'){
       this.day=true;
       this.year=false;
       this.month=false;
     }
  }
}

