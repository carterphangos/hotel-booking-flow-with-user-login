import api from "./axios";
import type { Room } from "../interfaces/room";

export type { Room };

export interface RoomSearchParams {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  sortBy?: "lowest-price" | "highest-price" | "rating";
}

export interface PaginatedRooms {
  current_page: number;
  data: Room[];
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
  per_page: number;
  // ...other fields as needed
}

export async function getRooms(params?: Record<string, any>): Promise<PaginatedRooms> {
  const res = await api.get("/rooms", { params });
  return res.data;
}

export async function getRoom(id: string): Promise<Room> {
  const res = await api.get(`/rooms/${id}`);
  return res.data;
}
