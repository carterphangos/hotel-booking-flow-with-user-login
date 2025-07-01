import api from "./axios";
import type { Booking } from "../interfaces/booking";

export async function getBookings(): Promise<Booking[]> {
  const res = await api.get("/bookings");
  return res.data;
}

export async function cancelBooking(bookingId: string): Promise<Booking> {
  const res = await api.post(`/bookings/${bookingId}/cancel`);
  return res.data;
}

export async function createBooking(data: {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  title: string;
  name: string;
  email: string;
}): Promise<Booking> {
  const res = await api.post("/bookings", {
    room_id: data.roomId,
    check_in: data.checkIn,
    check_out: data.checkOut,
    guests: data.guests,
    title: data.title,
    name: data.name,
    email: data.email,
  });
  return res.data;
}
