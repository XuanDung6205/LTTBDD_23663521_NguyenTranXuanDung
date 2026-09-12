// 1. Hàm tạo Promise mô phỏng tác vụ có thể bị lỗi
function fetchUserData(userId: number): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve(`Thành công: Lấy dữ liệu user ${userId}`);
      } else {
        reject(new Error("ID người dùng không hợp lệ!"));
      }
    }, 1000);
  });
}

// 2. Sử dụng try/catch để xử lý lỗi trong async function
async function getUserInfo(id: number): Promise<void> {
  try {
    const data: string = await fetchUserData(id);
    console.log(data); // Thực thi nếu Promise resolve
  } catch (error: unknown) {
    // Thực thi nếu Promise reject
    if (error instanceof Error) {
      console.error("Bắt được lỗi:", error.message);
    } else {
      console.error("Lỗi không xác định:", error);
    }
  }
}

// Chạy thử nghiệm:
getUserInfo(1);  // In ra: "Thành công: Lấy dữ liệu user 1" sau 1 giây
getUserInfo(-1); // In ra: "Bắt được lỗi: ID người dùng không hợp lệ!" sau 1 giây