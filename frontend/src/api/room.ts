import api from "./axios";
import { PaginatedRooms, Room } from "../interfaces/room";

export async function getRooms(params?: Record<string, any>): Promise<PaginatedRooms> {
  const res = await api.get("/rooms", { params });
  return res.data;
}

export async function getRoom(id: string): Promise<Room> {
  const res = await api.get(`/rooms/${id}`);
  return res.data;
}
