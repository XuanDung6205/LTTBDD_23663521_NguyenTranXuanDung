import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials } from "../store/authSlice";
import { hydrateCart } from "../store/cartSlice";
import { hydrateWishlist } from "../store/wishlistSlice";
import { clearAuth, loadAuth, saveAuth } from "../storage/authStorage"; 
import { loadJSON } from "../storage/storage"; 
import { useAutoPersist } from "./useAutoPersist";
import { CartItem } from "../types"; 

export const CART_KEY = "@bookstore/cart";
export const WISHLIST_KEY = "@bookstore/wishlist";

export function usePersistence() {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);

  useEffect(() => {
    (async () => {
      // TODO BT8.7b: Đọc cả ba (auth, cart, wishlist) bằng Promise.all để tải song song cho nhanh
      const [auth, cart, wish] = await Promise.all([
        loadAuth(),
        loadJSON<CartItem[]>(CART_KEY),
        loadJSON<number[]>(WISHLIST_KEY)
      ]);

      // Nạp dữ liệu vào Redux store nếu có
      if (auth?.token && auth?.user) dispatch(setCredentials(auth));
      if (cart) dispatch(hydrateCart(cart));
      if (wish) dispatch(hydrateWishlist(wish));

      setReady(true); // Đánh dấu khởi tạo hoàn tất
    })();
  }, [dispatch]);

  // Effect ghi/xóa phiên Đăng nhập (Bài 8.3)
  useEffect(() => {
    if (!ready) return;
    if (user && token) saveAuth({ user, token });
    else clearAuth();
  }, [ready, user, token]);

  // TODO BT8.7b: Gọi hook tự động lưu cho giỏ hàng và danh sách yêu thích[cite: 1]
  useAutoPersist(CART_KEY, cartItems, ready);
  useAutoPersist(WISHLIST_KEY, wishlistIds, ready);

  return ready;
}