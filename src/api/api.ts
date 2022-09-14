const API_URL = 'https://my-json-server.typicode.com/SpaceHook/demo/books';

export function getBooks() {
  return fetch(API_URL)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}
