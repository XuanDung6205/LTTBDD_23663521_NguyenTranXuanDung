// 1. Tạo Promise trực tiếp
const helloPromise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Hello Async");
  }, 2000);
});

// Sử dụng với .then()
helloPromise.then((result: string) => {
  console.log(result); // In ra "Hello Async" sau 2 giây
});