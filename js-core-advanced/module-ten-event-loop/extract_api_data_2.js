async function extractApiDataTimeout(url, timeout) {
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchTimeout = setTimeout(() => {
    controller.abort;
  }, timeout);

  try {
    const response = await fetch(url, { signal });
    clearTimeout(fetchTimeout);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log(`Runtime error`);
    } else {
      console.log(`Other error occured, ${error.message}`);
    }
    return null;
  }
}
// url = 'https://jsonplaceholder.typicode.com/invalid-url';
url = 'https://jsonplaceholder.typicode.com/posts/1';
timeout = 3000;

extractApiDataTimeout(url, timeout).then((data) => {
  if (data) {
    console.log('Success');
  }
});
