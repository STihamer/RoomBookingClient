export class Room {
  id: number = 0;
  name: string = '';
  location: string = '';
  capacities: Array<LayoutCapacity> = new Array<LayoutCapacity>();

  static fromHttp(room: Room) {
    const newRoom = new Room();
    newRoom.id = room.id;
    newRoom.name = room.name;
    newRoom.location = room.location;
    newRoom.capacities = new Array<LayoutCapacity>;
    for (const lc of room.capacities) {
      newRoom.capacities.push(LayoutCapacity.fromHttp(lc));
    }
    return newRoom;
  }
}


export class LayoutCapacity {
  // @ts-ignore
  layout: Layout;
  capacity: number = 0;

  static fromHttp(lc: LayoutCapacity) {
    const newLc = new LayoutCapacity();
    newLc.capacity = lc.capacity;
    // @ts-ignore
    newLc.layout = Layout[lc.layout];
    return newLc;
  }
}

export enum Layout {

  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting'
}
