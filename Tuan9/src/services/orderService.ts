import { api } from "../api/client";
import { Order } from "../types";

export async function createOrder(order: Omit<Order, "id">): Promise<Order> {
  const res = await api.post<Order>("/orders", order);
  return res.data;
}

export async function getOrders(userId: number): Promise<Order[]> {
  const res = await api.get<Order[]>("/orders", {
    params: {
      userId,
      _sort: "createdAt",
      _order: "desc",
    },
  });
  // Sắp xếp giảm dần theo thời gian tạo
  return res.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
