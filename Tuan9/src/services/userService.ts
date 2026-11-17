import { api } from "../api/client";
import { User } from "../types";

export async function updateProfile(userId: number, data: Partial<User>): Promise<User> {
  const res = await api.patch<User>(`/users/${userId}`, data);
  return res.data;
}
