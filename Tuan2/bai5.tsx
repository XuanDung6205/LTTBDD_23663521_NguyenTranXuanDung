function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task done");
    }, time);
  });
}

// Cách sử dụng (ví dụ truyền vào 1500ms = 1.5 giây):
simulateTask(1500).then((message: string) => {
  console.log(message); // In ra "Task done" sau 1.5 giây
});