import { Room } from "./room";
import { Booking } from "./booking";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
}

export interface BookingWithRoom extends Booking {
  room: Room;
}

export interface UserWithBookings extends User {
  bookings: BookingWithRoom[];
}
