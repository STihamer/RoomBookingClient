import {Layout, Room} from "./Room";
import {User} from "./User";

export class Booking {
  id: number = 0;
  room: Room = new Room();
  user: User = new User();
  // @ts-ignore
  layout: Layout = Layout;
  title: string = '';
  date: string = new Date();
  startTime: string = '';
  endTime: string = '';
  participants: number = 0;

  getDateAsDate() {
    return new Date(this.date);
  }


  static fromHttp(booking: Booking) {
    const newBooking = new Booking();
    newBooking.id = booking.id;
    newBooking.room = Room.fromHttp(booking.room);
    newBooking.user = User.fromHttp(booking.user);
    // @ts-ignore
    newBooking.layout = Layout[booking.layout];
    newBooking.title = booking.title;
    newBooking.startTime = booking.startTime;
    newBooking.endTime = booking.endTime;
    newBooking.participants = booking.participants;
    return newBooking;
  }
}
