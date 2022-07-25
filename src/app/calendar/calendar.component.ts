import {Component, OnInit} from '@angular/core';
import {Booking} from "../model/Booking";
import {DataService} from "../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  bookings: Array<Booking> = new Array<Booking>();
  selectedDate: string = '';
  dataLoaded = false;
  message = '';

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.message = 'Loading data ...';
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        console.log(this.selectedDate)
        if (!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
        }
        this.dataService.getBookings(this.selectedDate).subscribe(
          next => {
            this.bookings = next;
            this.dataLoaded = true;
            this.message = '';
          },
          error => this.message = 'Sorry - the data could not be loaded'
        );
      }
    )
  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'], {queryParams: {id: id}});
  }

  addBooking() {
    this.router.navigate(['addBooking']);
  }

  deleteBooking(id: number) {
    this.message = 'deleting message please wait...'
    this.dataService.deleteBooking(id).subscribe(
      next => {
        this.message = '';
        this.loadData();
      },
      error => {
        this.message = 'Sorry there was a problem deleting the item';
      }
    );

  }

  dateChanged() {
    this.router.navigate([''], {queryParams: {date: this.selectedDate}})
  }
}
