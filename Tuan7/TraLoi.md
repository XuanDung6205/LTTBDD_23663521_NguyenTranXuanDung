# Câu trả lời câu hỏi lý thuyết Buổi 7 — BookStore

### Câu 1: Cấu trúc điều hướng
- **Vì sao BookDetail được đăng ký ở Stack mà không đặt trong Tab?**
  Màn hình `BookDetail` (Chi tiết sách) là màn hình đi sâu vào nội dung (drill-down), cần chiếm toàn bộ không gian hiển thị và che lấp thanh Tab Bar ở đáy màn hình. Khi nằm trong `Native Stack`, màn hình sẽ tự động có Header chứa nút mũi tên quay lại (`← Back`) chuẩn native.
- **Nếu đặt vào Tab thì màn hình sẽ khác đi thế nào?**
  Nếu đặt `BookDetail` vào Tab, nó sẽ trở thành một tab ngang hàng với Home/Giỏ hàng. Khi đó thanh Bottom Tab Bar vẫn luôn nằm ở dưới đáy màn hình gây chiếm diện tích và mất đi nút quay lại tự động của Stack.

---

### Câu 2: Redux Toolkit & useMemo
- **Vì sao viết `state.items.push(...)` mà state gốc không bị sửa trực tiếp?**
  Redux Toolkit tích hợp sẵn thư viện **Immer**. Khi viết cú pháp mutate (`push`, gán trực tiếp), thực chất ta đang thao tác trên một đối tượng `draft` (bản sao nháp dùng Proxy). Sau khi reducer chạy xong, Immer sẽ đối chiếu các thay đổi trên bản nháp và tự động tạo ra một cây state mới hoàn toàn bất biến (immutable).
- **Thử bỏ `useMemo` trong `useCart`: kết quả hiển thị có đổi không, và có hậu quả gì?**
  Bỏ `useMemo` thì kết quả tính tổng hiển thị **không bị thay đổi** (vẫn tính đúng tổng số lượng và tổng tiền). Tuy nhiên, hậu quả là hàm `reduce` sẽ bị tính toán lại ở **mọi lần component re-render** (kể cả khi giỏ hàng không hề thay đổi), gây hao tổn CPU không cần thiết, đặc biệt khi giỏ hàng có nhiều sản phẩm.

---

### Câu 3: Xử lý bất đồng bộ với Promise.all
- **Nếu `getCategories()` lỗi còn `getBooks()` thành công thì Home hiện gì?**
  Vì cơ chế của `Promise.all` là "tất cả cùng thành công hoặc thất bại ngay khi có một lỗi" (*fail-fast*), nên chỉ cần `getCategories()` bị lỗi thì toàn bộ `Promise.all` sẽ bị reject. Màn Home sẽ nhảy vào khối `catch` và hiển thị màn hình báo lỗi `ErrorView`, người dùng không xem được sách dù API sách đã tải thành công.
- **Giải pháp và sự đánh đổi:**
  Để vẫn hiển thị được danh sách sách, ta có thể thay thế bằng `Promise.allSettled([getBooks(), getCategories()])`. Hàm này luôn đợi cả hai request hoàn tất và trả về trạng thái của từng request (`status: "fulfilled"` hoặc `"rejected"`), từ đó ta vẫn `setBooks` nếu phần sách thành công.
  **Đánh đổi:** Code xử lý phức tạp hơn vì phải kiểm tra trạng thái độc lập của từng request, và giao diện có thể rơi vào trạng thái chắp vá (có danh sách sách nhưng mất hàng chip danh mục lọc).

---

### Câu 4: Kỹ thuật Debounce
- **Vì sao không đặt `setTimeout` thẳng trong `onChangeText`?**
  Nếu đặt `setTimeout` thẳng trong `onChangeText`, mỗi lần người dùng nhấn phím sẽ kích hoạt một bộ đếm giờ riêng biệt và không có cách nào hủy được các timer trước đó. Kết quả là mỗi phím gõ đều sẽ phát sinh một lần lọc (chỉ là bị chậm đi chứ không gộp lại được), làm mất hoàn toàn ý nghĩa của debounce.
- **Hàm dọn dẹp (`return () => clearTimeout`) giúp tránh lỗi gì?**
  Hàm dọn dẹp giúp hủy ngay lập tức bộ hẹn giờ cũ khi có ký tự mới được gõ vào (giúp việc lọc chỉ chạy đúng một lần sau lần gõ cuối cùng). Đồng thời, nó còn giúp tránh lỗi cập nhật state trên component đã bị unmount (*Can't perform a React state update on an unmounted component*) nếu người dùng thoát màn hình trong lúc hẹn giờ đang chạy.

---

### Câu 5: Code bổ sung — Tuỳ chọn sắp xếp “Giá tăng dần / giảm dần”
Đoạn code bổ sung cho màn hình `HomeScreen`:

```tsx
// 1. Thêm state quản lý thứ tự sắp xếp giá:
const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

// 2. Sắp xếp kết hợp bên trong useMemo của visibleBooks:
const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
  if (!sortOrder) return filtered;
  return [...filtered].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );
}, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);
```
*(Để đổi kiểu sắp xếp trên giao diện, chỉ cần gọi `setSortOrder("asc")` hoặc `setSortOrder("desc")` hoặc `setSortOrder(null)`)*.
