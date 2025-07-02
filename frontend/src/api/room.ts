import api from "./axios";
import { PaginatedRooms, Room } from "../interfaces/room";

function mapRoomParams(params?: Record<string, any>) {
  const mapped: Record<string, any> = {};
  if (!params) return mapped;

  if (params.guests) mapped["filters[guest]"] = params.guests;

  if (params.sortBy === "lowest-price") {
    mapped["filters[sortColumn]"] = "price";
    mapped["filters[sortOrder]"] = "asc";
  } else if (params.sortBy === "highest-price") {
    mapped["filters[sortColumn]"] = "price";
    mapped["filters[sortOrder]"] = "desc";
  }

  if (params.checkIn) mapped["filters[checkin]"] = params.checkIn;
  if (params.checkOut) mapped["filters[checkout]"] = params.checkOut;

  if (params.page) mapped["page"] = params.page;

  return mapped;
}

export async function getRooms(params?: Record<string, any>): Promise<PaginatedRooms> {
  const mappedParams = mapRoomParams(params);
  const res = await api.get("/rooms", { params: mappedParams });
  return res.data;
}

export async function getRoom(id: string): Promise<Room> {
  const res = await api.get(`/rooms/${id}`);
  return res.data;
}
