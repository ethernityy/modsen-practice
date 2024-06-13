async function fetchDataSequentially() {
  try {
    const response1 = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    if (!response1.ok) {
      throw new Error(`Error: ${response1.statusText}`);
    }
    const data1 = await response1.json();

    const response2 = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${data1.userId}`
    );
    if (!response2.ok) {
      throw new Error(`Error: ${response2.statusText}`);
    }
    const data2 = await response2.json();
    return data2;
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchDataSequentially()
  .then((data) => console.log('Second request result:', data))
  .catch((error) => console.error('Error:', error));
