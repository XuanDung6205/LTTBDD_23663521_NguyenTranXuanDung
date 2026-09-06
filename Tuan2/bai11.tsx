// 1. Hàm tạo Promise trả về "Hello Async" sau 2 giây
function getHelloPromise(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello Async");
    }, 2000);
  });
}

// 2. Chuyển đổi cách gọi bằng async/await
async function run(): Promise<void> {
  const result: string = await getHelloPromise();
  console.log(result); // In ra "Hello Async" sau 2 giây
}

run();