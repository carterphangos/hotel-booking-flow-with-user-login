import api from "./axios";
import type { User } from "../interfaces/user";
import type { Booking } from "../interfaces/booking";
import type { Room } from "../interfaces/room";

export interface BookingWithRoom extends Booking {
  room: Room;
}

export interface UserWithBookings extends User {
  bookings: BookingWithRoom[];
}

export async function getUserById(id: string): Promise<UserWithBookings> {
  const res = await api.get(`/users/${id}`);
  return res.data.user[0];
}
