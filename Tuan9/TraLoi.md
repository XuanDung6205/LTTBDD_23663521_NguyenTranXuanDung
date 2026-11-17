BÀI TẬP REACT NATIVE
1. Cờ ready trong useAutoPersist

Nếu bỏ điều kiện ready, ứng dụng có thể ghi đè giỏ hàng đã lưu bằng giỏ hàng rỗng.

Thứ tự render:

Render lần đầu: State giỏ hàng khởi tạo là [].
Effect lưu dữ liệu chạy và có thể ghi [] vào AsyncStorage.
Effect đọc dữ liệu cũ từ AsyncStorage.
State được cập nhật thành giỏ hàng đã lưu.
Dữ liệu cũ có nguy cơ đã bị ghi đè.

Cờ ready giúp ngăn việc lưu dữ liệu trước khi quá trình đọc và khôi phục dữ liệu hoàn tất.

2. Token giả

Hai điểm không an toàn:

Kiểm tra mật khẩu ở phía client: Người dùng có thể xem và can thiệp vào mã nguồn, làm giả kết quả đăng nhập.
Tự tạo token ở phía client: Token không được máy chủ xác thực phát hành, có thể bị giả mạo.

Trong hệ thống thật:

Backend chịu trách nhiệm kiểm tra mật khẩu.
Backend phát hành token sau khi xác thực thành công.
iOS nên lưu token trong Keychain.
Android nên sử dụng Keystore kết hợp giải pháp lưu trữ an toàn.
React Native có thể dùng thư viện react-native-keychain.

Không nên lưu token nhạy cảm trong AsyncStorage.

3. Hai effect trong CartItemRow

Effect setQty(item.quantity) dùng để đồng bộ số lượng hiển thị với Store.

Nếu xóa effect này, số lượng hiển thị có thể bị lệch khi:

Một component khác tăng số lượng sản phẩm.
Một component khác giảm số lượng sản phẩm.
Số lượng sản phẩm bị thay đổi hoặc xóa trong Store.

Ví dụ:

Ban đầu Store có số lượng 2.
Nút hiển thị 2.
Component khác cập nhật Store thành 5.
Store có giá trị 5 nhưng nút vẫn hiển thị 2.

Do đó, effect đồng bộ giúp state nội bộ luôn theo kịp dữ liệu trong Store.

4. Một nguồn State

Nếu mỗi HeartButton sử dụng useState riêng:

Nút tim ở danh sách sản phẩm có trạng thái riêng.
Nút tim ở trang chi tiết có trạng thái riêng.
Khi nhấn yêu thích ở một nơi, nơi còn lại có thể không cập nhật.

Store giải quyết vấn đề bằng cách cung cấp một nguồn state dùng chung.

Các component cùng đọc và cập nhật trạng thái yêu thích từ Store. Khi Store thay đổi, các component liên quan được cập nhật và hiển thị đồng nhất.

5. Thêm biểu tượng hiện/ẩn mật khẩu

Sử dụng state showPassword:

jsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text
} from 'react-native';

export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10
      }}>
        <TextInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={{ flex: 1 }}
        />

        <Pressable
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={{ fontSize: 20 }}>
            {showPassword ? '🙈' : '👁'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
Kết quả:

Ban đầu mật khẩu được ẩn.
Nhấn biểu tượng 👁 để hiện mật khẩu.
Nhấn biểu tượng 🙈 để ẩn mật khẩu.

Ảnh chụp màn hình: Cần chạy ứng dụng trên thiết bị hoặc trình giả lập, sau đó chụp màn hình giao diện thực tế để bổ sung vào bài nộp.


---

# CÂU HỎI & TRẢ LỜI LÝ THUYẾT — BUỔI 9

### 1. Giá trị dẫn xuất (Derived State) trong Form Validate (Bài 9.1)
- **Khái niệm**: Giá trị dẫn xuất là giá trị được tính toán trực tiếp từ các state có sẵn (ở đây là các trường `name`, `phone`, `address`) thay vì tạo thêm `useState` để lưu lỗi và cờ `isValid`.
- **Lợi ích**:
  - Tránh tình trạng bất đồng bộ state: nếu lưu `isValid` vào state riêng, mỗi khi người dùng nhập dữ liệu ta phải nhớ gọi `setIsValid`, rất dễ quên hoặc bị lệch 1 nhịp render (stale state).
  - Code gọn gàng, một nguồn chân lý (Single Source of Truth):
    ```ts
    const nameError = useMemo(() => validateRequired("họ tên")(name), [name]);
    const phoneError = useMemo(() => validatePhone(phone), [phone]);
    const addressError = useMemo(() => validateRequired("địa chỉ")(address), [address]);
    const isValid = !nameError && !phoneError && !addressError;
    ```

### 2. Cập nhật lạc quan (Optimistic Update) trong Thông báo (Bài 9.5)
- **Cơ chế**: Khi người dùng nhấn vào một thông báo chưa đọc, ứng dụng không chờ đợi cuộc gọi API `PATCH /notifications/:id` hoàn thành mà cập nhật ngay lập tức giao diện (đổi sang đã đọc, ẩn chấm xanh) trên thiết bị. Song song đó, app gửi request ngầm đến server.
- **Lợi ích**:
  - Tối ưu trải nghiệm người dùng (UX): Phản hồi tức thì, không có cảm giác trễ hay giật lag.
  - Phù hợp với các tác vụ có tỉ lệ thành công cao như đánh dấu đã đọc thông báo, like/tim bài viết.
  - Nếu API gặp sự cố (network error, timeout), app có thể rollback về trạng thái cũ hoặc thông báo cho người dùng.

### 3. Điều hướng theo dữ liệu (Data-driven Navigation) (Bài 9.5)
- **Khái niệm**: Dữ liệu thông báo trả về từ máy chủ chứa thông tin đích đến (`target`), ví dụ:
  - `{ target: { screen: "Orders" } }` -> Điều hướng đến màn hình Đơn hàng.
  - `{ target: { screen: "BookDetail", bookId: 7 } }` -> Điều hướng đến chi tiết sách id = 7.
- **Lợi ích**: Giúp ứng dụng linh hoạt, server có thể chủ động quyết định người dùng sẽ được đưa đến đâu khi nhấp vào thông báo mà không cần hard-code logic trong app.

### 4. Cơ chế hoạt động của RefreshControl (Bài 9.6)
- `RefreshControl` được gắn vào prop `refreshControl` của `ScrollView` hoặc `FlatList`.
- Gồm hai thành phần cốt lõi:
  - Prop `refreshing` (boolean): Điều khiển trạng thái quay của biểu tượng làm mới (spinner).
  - Prop `onRefresh` (hàm callback): Được kích hoạt khi người dùng kéo màn hình vượt ngưỡng làm mới. Trong hàm này, ta gọi API để nạp dữ liệu mới, sau đó đưa `refreshing` về `false`.