function processTask(isSuccess: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve("Tác vụ thành công!");
      } else {
        reject(new Error("Tác vụ thất bại!"));
      }
    }, 1000);
  });
}

// Trường hợp 1: Tác vụ THÀNH CÔNG
processTask(true)
  .then((result: string) => {
    console.log(result);
  })
  .catch((error: Error) => {
    console.error(error.message);
  })
  .finally(() => {
    console.log("Done"); // Luôn in ra "Done" sau 1 giây
  });

// Trường hợp 2: Tác vụ THẤT BẠI
processTask(false)
  .then((result: string) => {
    console.log(result);
  })
  .catch((error: Error) => {
    console.error(error.message);
  })
  .finally(() => {
    console.log("Done"); // Vẫn luôn in ra "Done" sau 1 giây
  });