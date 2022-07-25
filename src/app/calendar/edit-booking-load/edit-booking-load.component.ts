import {Component, OnInit} from '@angular/core';
import {EditBookingDataService} from "../../edit-booking-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-booking-load',
  templateUrl: './edit-booking-load.component.html',
  styleUrls: ['./edit-booking-load.component.css']
})
export class EditBookingLoadComponent implements OnInit {

  constructor(private editBookingDataService: EditBookingDataService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    setTimeout(() => this.navigateWhenReady(), 1000);
    this.navigateWhenReady();
  }

  navigateWhenReady() {
    if (this.editBookingDataService.dataLoaded === 2) {
      //if yes  = we will navigate to the edit component
      const id = this.route.snapshot.queryParams['id'];
      if(id){
        this.router.navigate(['editBooking'], {queryParams: {id: id}});
      }else{
        this.router.navigate(['addBooking']);
      }

    } else {
      //check to see if the service data is loaded
      //if not = wait 500ms then try again
      setTimeout(() => this.navigateWhenReady(), 500);
    }
  }
}
