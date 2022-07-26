import {Injectable} from '@angular/core';
import {Layout, Room} from "./model/Room";
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

    return this.http.put<User>(environment.restUrl + '/api/users', user);
  }

  addUser(newUser: User, password: string): Observable<User> {
    const fullUser = {id: newUser.id, name: newUser.name, password: password};
    return this.http.post<User>(environment.restUrl + '/api/users', fullUser);
  }

  private getCorrectedRoom(room: Room) {
    const correctedRoom = {id: room.id, name: room.name, location: room.location, capacities: []};
    for (const lc of room.capacities) {
      let correctLayout;
      for (let member in Layout) {
        // @ts-ignore
        if (Layout[member] === lc.layout) {
          correctLayout = member
        }
      }
      const correctedLayout = {layout: correctLayout, capacity: lc.capacity};

      // @ts-ignore
      correctedRoom.capacities.push(correctedLayout)
    }
    return correctedRoom;
  }

  updateRoom(room: Room): Observable<Room> {

    return this.http.put<Room>(environment.restUrl + '/api/rooms', this.getCorrectedRoom(room));
  }

  addRoom(newRoom: Room): Observable<Room> {

    return this.http.post<Room>(environment.restUrl + '/api/rooms', this.getCorrectedRoom(newRoom));
  }

  deleteRoom(id: number): Observable<any> {

    return this.http.delete(environment.restUrl + '/api/rooms/' + id);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/users/' + id);

  }

  resetUserPassword(id: number): Observable<any> {
    return this.http.get(environment.restUrl + '/api/users/resetPassword/' + id);
  }

  getBookings(date: string) : Observable<Array<Booking>> {
    return this.http.get<Array<Booking>>(environment.restUrl + "/api/bookings/" + date)
      .pipe(
        map ( data => {
          const bookings = new Array<Booking>();
          for (const booking of data) {
            bookings.push(Booking.fromHttp(booking));
          }
          return bookings;
        })
      );
  }


  getBooking(id: number): Observable<any> {
  return this.http.get<Booking>(environment.restUrl + '/api/bookings?id=' + id)
    .pipe(map(data => {
      return Booking.fromHttp(data);
    }))
  }

  updateBooking(booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(environment.restUrl + '/api/bookings', this.getCorrectedBooking(booking));
  }



  addBooking(newBooking: Booking): Observable<Booking> {
    return this.http.post<Booking>(environment.restUrl + '/api/bookings', this.getCorrectedBooking(newBooking));

  }

  deleteBooking(id: number): Observable<any> {

    return this.http.delete(environment.restUrl + "/api/bookings/" + id);
  }

  private getCorrectedBooking(booking: Booking) {

    let correctLayout;
    for (let member in Layout) {
      // @ts-ignore
      if (Layout[member] === booking.layout) {
        correctLayout = member;
      }
    }

    if (booking.startTime.length < 8) {
      booking.startTime = booking.startTime + ':00';
    }

    if (booking.endTime.length < 8) {
      booking.endTime = booking.endTime + ':00';
    }

    const correctedBooking = {id : booking.id,  room: this.getCorrectedRoom(booking.room), user: booking.user,
      title: booking.title, date: booking.date, startTime: booking.startTime, endTime: booking.endTime,
      participants: booking.participants, layout: correctLayout};

    return correctedBooking;
  }
}
