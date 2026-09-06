function getErrorAsync(): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000);
  });
}

// Cách sử dụng (bắt lỗi bằng .catch):
getErrorAsync()
  .then((data) => {
    console.log(data);
  })
  .catch((error: Error) => {
    console.error(error.message); // In ra: "Something went wrong" sau 1 giây
  });