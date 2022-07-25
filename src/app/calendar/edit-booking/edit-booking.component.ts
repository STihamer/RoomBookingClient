import {Component, OnInit} from '@angular/core';
import {Booking} from "../../model/Booking";
import {Layout, Room} from "../../model/Room";
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  booking: Booking = new Booking();
  rooms: Array<Room> = new Array<Room>();
  layouts = Object.keys(Layout);
  layoutEnum: any = Layout;
  users: Array<User> = new Array<User>();
  dataLoaded = false;
  message = 'Please wait...'

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.rooms = this.route.snapshot.data['rooms'];
    this.users = this.route.snapshot.data['users'];

    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.dataService.getBooking(+id).pipe(
        map(booking => {
          booking.room = this.rooms.find(room => room.id === booking.room.id);
          booking.user = this.users.find(user => user.id === booking.user.id);
          booking.date = formatDate(booking.date, 'yyyy-MM-dd', 'en-US');
          return booking;
        })
      ).subscribe(
        next => {
          this.booking = next;
          this.dataLoaded = true;
          this.message = '';
        }
      );
    } else {
      this.booking = new Booking();
      this.dataLoaded = true;
      this.message = '';
    }

  }

  onSubmit() {
    if (this.booking.id < 1) {
      this.dataService.addBooking(this.booking).subscribe(
        next => this.router.navigate(['']),
        error => this.message = 'something went wrong : the booking wasn\'t saved.'
      );
    } else {
      this.dataService.updateBooking(this.booking).subscribe(
        next => this.router.navigate(['']),
        error => this.message = 'something went wrong : the booking wasn\'t saved.'
      );
    }
  }

}
