'use strict';

function valueInArray(arr, value) {
  return arr.includes(value);
}

console.log(valueInArray([1, 2, 3, 4, 5, 6, 7, 22], 7));
console.log(valueInArray([1, 2, 3, 4, 5, 6, 7, 22], 9));
console.log(valueInArray([1, 2, 3, 4, 5, 6, 7, 22], 22));
