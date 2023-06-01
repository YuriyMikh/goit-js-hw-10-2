import { fetchBreeds, fetchCatByBreed } from '/src/cat-api';

const breedsSelectRef = document.querySelector('.breed-select');
const divContainer = document.querySelector('.cat-info');

// fetchBreeds().then(array => markupListBreeds(array));

// fetchBreeds().then(array => console.log(array));
// fetchCatByBreed('beng').then(array => console.log(array));

// fetchCatByBreed('beng').then(a => console.dir(a));

function markupListBreeds(arrayData) {
  breedsSelectRef.innerHTML = arrayData.map(
    element => `<option value="${element.id}">${element.name}</option>`
  );
}

fetchCatByBreed('beng').then(
  data => console.dir(data[0].breeds[0].temperament)

  //     divContainer.innerHTML = `

  // <p>${data.name}</p>
  // `
);
