import {Layout, Room} from "./Room";
import {User} from "./User";

export class Booking {
  id: number = 0;
  room: Room = new Room();
  user: User = new User();
  // @ts-ignore
  layout: Layout = Layout;
  title: string = '';
  date: string = '';
  startTime: string = '';
  endTime: string = '';
  participants: number = 0;

  getDateAsDate() {
    return new Date(this.date);
  }
}
