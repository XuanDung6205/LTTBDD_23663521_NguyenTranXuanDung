// 1. Tạo Promise khởi tạo với giá trị ban đầu là 2
Promise.resolve(2)
  .then((num: number) => {
    // Bước 1: Bình phương số 2 (2^2 = 4)
    return num * num;
  })
  .then((squared: number) => {
    // Bước 2: Nhân đôi kết quả (4 * 2 = 8)
    return squared * 2;
  })
  .then((doubled: number) => {
    // Bước 3: Cộng thêm 5 (8 + 5 = 13)
    return doubled + 5;
  })
  .then((finalResult: number) => {
    // In kết quả cuối cùng
    console.log("Kết quả cuối cùng:", finalResult); // In ra 13
  })
  .catch((error: Error) => {
    console.error("Lỗi trong chuỗi Promise:", error);
  });