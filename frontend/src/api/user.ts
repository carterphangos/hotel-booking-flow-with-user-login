import api from "./axios";
import type { UserWithBookings } from "../interfaces/user";

export async function getUserById(id: string): Promise<UserWithBookings> {
  const res = await api.get(`/users/${id}`);
  return res.data.user[0];
}
