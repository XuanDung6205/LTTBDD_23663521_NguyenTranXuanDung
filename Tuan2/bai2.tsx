function getNumberAsync(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
}

// Cách sử dụng:
getNumberAsync().then((result: number) => {
  console.log(result); // In ra số 10 sau 1 giây
});