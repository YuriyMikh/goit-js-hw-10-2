import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from '/src/cat-api';
import Notiflix from 'notiflix';

const breedsSelectRef = document.querySelector('#single');
const divContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

error.classList.add('is-hidden');
loader.classList.add('is-hidden');

fetchBreeds()
  .then(array => {
    markupListBreeds(array);
    // loader.classList.add('is-hidden');
  })
  .catch(data => {
    setTimeout(() => {
      loader.classList.add('is-hidden');
      error.classList.remove('is-hidden');
    }, 1000);
  });
// .finally(() => {
//   setTimeout(() => {
//     loader.classList.add('is-hidden');
//     error.classList.remove('is-hidden');
//   }, 1000);
// });

breedsSelectRef.addEventListener('change', onBreedSelect);

function onBreedSelect(event) {
  loader.classList.remove('is-hidden'); //показываем лоадер
  divContainer.classList.add('is-hidden'); //скрываем контейнер со всей разметкой

  fetchCatByBreed(event.target.value)
    .then(oneCatData => {
      markupCatByBreed(oneCatData);
    })
    .catch(data => {
      loader.classList.add('is-hidden');
      error.classList.remove('is-hidden');
    })
    //Делаем так чтобы сначала всё загрузилось и только потом в finally() снимаем класс is-hidden с контейнера и лоадера
    .finally(() => {
      //делаем через setTimeout, чтобы лоадер покрутился пол секунды. Чисто для визуального восприятия
      setTimeout(() => {
        loader.classList.add('is-hidden');
        divContainer.classList.remove('is-hidden');
      }, 500);
    });
}

function markupListBreeds(arrayData) {
  breedsSelectRef.innerHTML = arrayData.map(
    element => `<option value="${element.id}">${element.name}</option>`
  );
  new SlimSelect({ select: '#single' }); //после отрисовки разметки вставляем select из библиотеки SlimSelect
}

function markupCatByBreed(data) {
  divContainer.innerHTML = `
      <img style="height: 100px; width: 100px;" src=${data[0].url} alt="">
      <h3>${data[0].breeds[0].name}</h3>
      <p>${data[0].breeds[0].description}</p>
      <p><span class="span-breed">Temperament: </span>${data[0].breeds[0].temperament}</p>
   `;
}
