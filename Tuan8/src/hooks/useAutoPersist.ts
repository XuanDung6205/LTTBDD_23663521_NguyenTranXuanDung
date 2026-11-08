import { useEffect } from 'react';
import { saveJSON } from '../storage/storage';

export function useAutoPersist<T>(key: string, value: T, ready: boolean) {
  // TODO BT8.7b: Tự động lưu dữ liệu xuống bộ nhớ máy mỗi khi value thay đổi
  useEffect(() => {
    // Chỉ lưu khi dữ liệu ban đầu đã đọc xong (ready = true) để tránh ghi đè giỏ hàng rỗng
    if (ready) {
      saveJSON(key, value);
    }
  }, [key, value, ready]);
}