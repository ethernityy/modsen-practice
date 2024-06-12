'use strict';

function factorial(number) {
  return number != 1 ? number * factorial(number - 1) : 1;
}

console.log(factorial(5));
console.log(factorial(3));
console.log(factorial(4));
