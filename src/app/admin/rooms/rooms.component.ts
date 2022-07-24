import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";
import {ActivatedRoute, Router} from "@angular/router";
import {FormResetService} from "../../form-reset.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room> = new Array<Room>();
  selectedRoom: any;
  action: string = '';
  loadingData = true;
message = 'Please wait... getting the list of rooms';
  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService) {
  }

  ngOnInit(): void {
    this.dataService.rooms.subscribe(
      next => {
        this.rooms = next;
        this.loadingData = false;
      }, error => {
        if(error.status === 402){
          this.message = 'sorry -you need to pay to use this application' + error.message;
        }else{
          this.message = 'sorry -something went wrong, please try again';
          console.log('error', error);
        }

      }
    );
    this.route.queryParams.subscribe(params => {
      this.action = '';
      const id = params['id'];
      if (id) {
        this.selectedRoom = this.rooms.find(room =>
          room.id === +id);
        this.action = params['action'];
      }
      if (params['action'] === 'add') {
        this.selectedRoom = new Room();
        this.action = 'edit';
        this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
      }
    });

  }

  setRoom(id: number) {
    this.router.navigate(['admin', 'rooms'], {queryParams: {id: id, action: 'view'}})
  }

  addRoom() {
    this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'add'}});
  }
}
