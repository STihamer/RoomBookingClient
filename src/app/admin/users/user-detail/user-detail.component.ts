import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../model/User";
import {Router} from "@angular/router";
import {DataService} from "../../../data.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input()
  user: User = new User();

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';

  constructor(private router: Router,
              private dataService: DataService) {
  }

  ngOnInit(): void {

  }

  editUser() {
    this.router.navigate(['admin', 'users'], {queryParams: {action: 'edit', id: this.user.id}})
  }

  deleteUser() {
    this.message = 'deleting';
    this.dataService.deleteUser(this.user.id).subscribe(
      next => {
        this.dataChangedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }, error => this.message = 'Sorry, this user cannot be deleted at this time.'
    )
  }

  resetPassword() {
    this.message = 'please wait';
    this.dataService.resetUserPassword(this.user.id).subscribe(
      next => this.message = 'This password has been reset.',
      error => this.message = 'Sorry something went wrong'
    );
  }

}
