function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
  const API_KEY =
    'live_ios2ViwVftg3OAym14VSiesOXjCkOsDERoxC7To1ST9s1rQKqYjTMpKJreUyVgzl';
  // const params = new URLSearchParams({
  //     api_key: API_KEY,
  // })
  return fetch(`${BASE_URL}?api_key=${API_KEY}`).then(response => {
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1/images/search';
  const API_KEY =
    'live_ios2ViwVftg3OAym14VSiesOXjCkOsDERoxC7To1ST9s1rQKqYjTMpKJreUyVgzl';

  return fetch(`${BASE_URL}?breed_ids=${breedId}&api_key=${API_KEY}`).then(
    response => {
      return response.json();
    }
  );
}

export { fetchBreeds, fetchCatByBreed };
