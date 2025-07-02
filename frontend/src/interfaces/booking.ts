import { Room } from "./room";

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

export interface BookingData {
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  selectedRoom?: {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
  };
  contactInfo?: {
    title: string;
    name: string;
    email: string;
  };
  bookingNumber?: string;
  total?: number;
}

export interface BookingWithRoom {
  id: string;
  user_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  booking_number: string;
  total: string;
  status: string;
  nights: number;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
  room?: Room;
}
