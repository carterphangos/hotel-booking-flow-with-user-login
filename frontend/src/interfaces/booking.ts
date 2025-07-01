import type { Room } from "./room";

export interface Booking {
  id: string;
  bookingNumber: string;
  room: Room;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  total: number;
  status: "upcoming" | "past" | "cancelled";
  createdAt: string;
}
