function logLastChar(str) {
  if (str.length === 0) {
    console.log('The string is empty');
  }
  console.log(str[str.length - 1]);
}

logLastChar('Hello world');
logLastChar('The quick brown fox');
