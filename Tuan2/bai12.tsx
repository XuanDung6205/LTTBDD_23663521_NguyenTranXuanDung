// Hàm simulateTask từ câu 5
function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task done");
    }, time);
  });
}

// Hàm async thực thi simulateTask(2000)
async function executeTask(): Promise<void> {
  const result: string = await simulateTask(2000);
  console.log(result); // In ra "Task done" sau 2 giây
}

executeTask();