// 1. Hàm tạo Promise mô phỏng tác vụ bất đồng bộ
function simulateTask_6(id: number, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task ${id} done`);
    }, time);
  });
}

// 2. Tạo 3 Promise chạy song song
const promise1_6 = simulateTask_6(1, 1000); // Hoàn thành sau 1 giây
const promise2_6 = simulateTask_6(2, 2000); // Hoàn thành sau 2 giây
const promise3_6 = simulateTask_6(3, 1500); // Hoàn thành sau 1.5 giây

// 3. Sử dụng Promise.all() để chờ tất cả hoàn thành
Promise.all([promise1_6, promise2_6, promise3_6])
  .then((results: string[]) => {
    console.log("Tất cả tác vụ đã xong:", results);
    // Kết quả in ra sau 2 giây (theo thời gian của tác vụ lâu nhất):
    // ["Task 1 done", "Task 2 done", "Task 3 done"]
  })
  .catch((error: Error) => {
    console.error("Một trong các tác vụ bị lỗi:", error);
  });