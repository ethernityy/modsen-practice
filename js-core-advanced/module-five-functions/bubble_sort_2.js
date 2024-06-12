function buubleSort(arr) {
  let temp;
  let swapped;
  for (let i = 0; i < arr.length; i++) {
    swapped = false;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

console.log(buubleSort([64, 34, 25, 12, 22, 11, 90]));
