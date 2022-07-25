import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "./model/User";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class PrefetchUsersService implements Resolve<Observable<Array<User>>> {

  constructor(private dataService:DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Array<User>>> | Promise<Observable<Array<User>>> | Observable<Array<User>> {
    return this.dataService.users;;
  }


}
