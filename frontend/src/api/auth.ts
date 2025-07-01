import api from "./axios";
import type { User } from "../interfaces/user";

export async function login(email: string, password: string): Promise<{ user: User; access_token: string }> {
  const res = await api.post("/login", { email, password });
  return res.data;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  title: string;
}): Promise<{ user: User; access_token: string }> {
  const res = await api.post("/register", data);
  return res.data;
}

export async function logout(): Promise<void> {
  await api.post("/logout");
}
