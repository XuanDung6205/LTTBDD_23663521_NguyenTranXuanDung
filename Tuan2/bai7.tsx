// 1. Hàm tạo Promise mô phỏng tác vụ bất đồng bộ
function simulateTask_7(id: number, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task ${id} done (chờ ${time}ms)`);
    }, time);
  });
}

// 2. Tạo 3 Promise với thời gian chạy khác nhau
const promise1 = simulateTask_7(1, 3000); // 3 giây
const promise2 = simulateTask_7(2, 1000); // 1 giây (nhanh nhất)
const promise3 = simulateTask_7(3, 2000); // 2 giây

// 3. Sử dụng Promise.race() để lấy kết quả của tác vụ về đích đầu tiên
Promise.race([promise1, promise2, promise3])
  .then((winner: string) => {
    console.log("Tác vụ xong đầu tiên là:", winner);
    // In ra sau 1 giây: "Task 2 done (chờ 1000ms)"
  })
  .catch((error: Error) => {
    console.error("Tác vụ đầu tiên gặp lỗi:", error);
  });