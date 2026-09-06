// 1. Tạo hàm trả về Promise sinh số ngẫu nhiên
function getRandomNumber(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random();
      // Nếu số ngẫu nhiên >= 0.5 thì coi như thành công, ngược lại là thất bại
      if (randomNumber >= 0.5) {
        resolve(randomNumber);
      } else {
        reject(new Error(`Số quá nhỏ: ${randomNumber}`));
      }
    }, 1000);
  });
}

// 2. Sử dụng .then() và .catch() để xử lý
getRandomNumber()
  .then((result: number) => {
    console.log("Thành công! Số ngẫu nhiên là:", result);
  })
  .catch((error: Error) => {
    console.error("Thất bại! Lỗi:", error.message);
  });