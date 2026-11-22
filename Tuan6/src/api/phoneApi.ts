import { Phone } from "../types";

export const API_URL = "https://6aca39c43115bcc95820a05b.mockapi.io/phones";

// Lấy danh sách toàn bộ sản phẩm từ MockAPI
export async function fetchPhones(): Promise<Phone[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`Máy chủ trả về lỗi ${res.status}`);
  }
  const data = (await res.json()) as Phone[];
  return data;
}

// Lấy chi tiết một sản phẩm theo ID từ MockAPI
export async function fetchPhone(id: string): Promise<Phone> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    throw new Error(`Máy chủ trả về lỗi ${res.status}`);
  }
  const data = (await res.json()) as Phone;
  return data;
}
