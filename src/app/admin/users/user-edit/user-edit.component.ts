import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {FormResetService} from "../../../form-reset.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  @Input()
  user: User = new User();
  action: string = '';
  formUser: User = new User();
  message: string = '';
  password: string = '';
  password2: string = '';
  nameIsValid = false;
  passwordsAreValid = false;
  passwordsMatch = false;
  userResetSubscription: Subscription = new Subscription();

  constructor(private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) {
  }

  ngOnDestroy(): void {
    this.userResetSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.userResetSubscription = this.formResetService.resetUserFormEvent.subscribe(
      user => {
        this.user = user;
        this.initializeForm();
      }
    )
  }

  initializeForm() {
    this.formUser = Object.assign({}, this.user);
    this.checkIfNameIsValid();
    this.checkIfPasswordsAreValid();
  }

  onSubmit() {
    if (this.formUser.id == 0) {
      this.dataService.addUser(this.formUser, this.password).subscribe(
        user => {
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        }
      );
    } else {
      this.dataService.updateUser(this.formUser).subscribe(
        user => {
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}}
          );
        }
      )
    }
  }

  checkIfNameIsValid() {
    this.nameIsValid = this.formUser.name.trim().length > 0;
  }

  checkIfPasswordsAreValid() {
    if (this.formUser.id != 0) {
      this.passwordsAreValid = true;
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = this.password === this.password2;
      if (this.password) {
        this.passwordsAreValid = this.password.trim().length > 0;
      } else {
        this.passwordsAreValid = false;
      }
    }
  }
}
