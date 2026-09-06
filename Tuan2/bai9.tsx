function filterEvenNumbers(numbers: number[]): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Lọc các số chẵn (chia hết cho 2)
      const evenNumbers = numbers.filter((num: number) => num % 2 === 0);
      resolve(evenNumbers);
    }, 1000);
  });
}

// Cách sử dụng:
const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

filterEvenNumbers(inputArray).then((result: number[]) => {
  console.log("Mảng số chẵn sau khi lọc:", result); 
  // In ra sau 1 giây: [2, 4, 6, 8, 10]
});