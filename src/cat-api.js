const BASE_URL_BREEDS = 'https://api.thecatapi.com/v1/breeds';
const BASE_URL_IMAGES = 'https://api.thecatapi.com/v1/images/search';
const API_KEY =
  'api_key=live_gMvLfc5Q1BBvM4bZ9764sbQq3tGdsdgN4rwcVPRHY1cX9R2iiV8TOUldepTICVtM';

export function fetchBreeds() {
  return fetch(`${BASE_URL_BREEDS}?${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL_IMAGES}?breed_ids=${breedId}&${API_KEY}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

