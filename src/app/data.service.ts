import {Injectable} from '@angular/core';
import {Room} from "./model/Room";
import {User} from "./model/User";
import {map, Observable, of} from "rxjs";
import {Booking} from "./model/Booking";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    console.log(environment.restUrl);
  }

  get rooms(): Observable<Array<Room>> {
    return this.http.get<Array<Room>>(environment.restUrl + '/api/rooms')
      .pipe(
        map(data => {
          const rooms = new Array<Room>();
          for (const room of data) {
            rooms.push(Room.fromHttp(room));
          }
          return rooms
        })
      );
  }


  get users(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/users')
      .pipe(
        map(data => {
          const users = new Array<User>();
          for (const user of data) {
            users.push(User.fromHttp(user));
          }
          return users
        })
      );
  }

  updateUser(user: User): Observable<User> {
    // @ts-ignore
    return of(null)
  }

  addUser(newUser: User, password: string): Observable<User> {
    // @ts-ignore
    return of(null);
  }

  updateRoom(room: Room): Observable<Room> {
    // @ts-ignore
    return of(null);
  }

  addRoom(newRoom: Room): Observable<Room> {

    // @ts-ignore
    return of(null);
  }

  deleteRoom(id: number): Observable<any> {

    return of(null);
  }

  deleteUser(id: number): Observable<any> {

    return of(null);
  }

  resetUserPassword(id: number): Observable<any> {
    return of(null);
  }

  getBookings(date: string): Observable<Array<Booking>> {
    // @ts-ignore
    return of(null);
  }

  getBooking(id: number): Observable<any> {
    return of(null);
  }

  saveBooking(booking: Booking): Observable<Booking> {
    // @ts-ignore
    return of(null);
  }


  // @ts-ignore
  addBooking(newBooking: Booking): Observable<Booking> {
    // @ts-ignore
    return of(null);
  }

  deleteBooking(id: number): Observable<any> {

    return of(null);
  }



}
