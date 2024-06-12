function sumFirstHalf(arr) {
  const halfLength = Math.floor(arr.length / 2);
  return arr
    .slice(0, halfLength)
    .reduce((accumulator, current) => accumulator + current, 0);
}

console.log(sumFirstHalf([1, 2, 3, 4, 5]));
console.log(sumFirstHalf([1, 2, 3, 4, 5, 6]));
