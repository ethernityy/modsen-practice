async function fetchUrls(urls) {
  const fetchPromises = urls.map((url) =>
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error occurs: ${response.statusText}`);
        }
        return response.text();
      })
      .catch((error) => `Error loading ${url}: ${error.message}`)
  );

  const results = await Promise.all(fetchPromises);
  return results;
}

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
  'https://jsonplaceholder.typicode.com/invalid-url',
];

fetchUrls(urls)
  .then((resolve) => resolve.forEach((content) => console.log(content)))
  .catch((error) => console.error(error));
