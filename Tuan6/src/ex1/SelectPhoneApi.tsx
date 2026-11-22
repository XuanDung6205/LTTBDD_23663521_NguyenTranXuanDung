import React, { useState, useEffect, useCallback } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { SelectPhoneApp } from "./SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    // TODO 1: Reset trạng thái lỗi và dữ liệu về null trước khi gọi API
    setError(null);
    setPhone(null);

    // TODO 2: Gọi fetchPhone("1") để lấy sản phẩm id 1 từ MockAPI
    try {
      const data = await fetchPhone("1");
      setPhone(data);
    } catch (e: any) {
      setError(e?.message ?? "Đã xảy ra lỗi khi kết nối với máy chủ API");
    }
  }, []);

  // TODO 3: useEffect gọi load() khi component được render lần đầu tiên
  useEffect(() => {
    load();
  }, [load]);

  // TODO 4: Nếu có lỗi (mất mạng, sai URL, mã lỗi 404/500...) → hiện ErrorBox kèm nút THỬ LẠI
  if (error) {
    return <ErrorBox message={error} onRetry={load} />;
  }

  // TODO 5: Nếu đang tải và chưa có dữ liệu phone → hiện vòng xoay Loading
  if (!phone) {
    return <Loading message="Đang tải dữ liệu từ MockAPI..." />;
  }

  // TODO 6: Tải thành công → tái sử dụng SelectPhoneApp của Bài 1 với phone từ API
  return <SelectPhoneApp phone={phone} />;
}
