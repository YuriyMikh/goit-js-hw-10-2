import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from '/src/cat-api';

const breedsSelectRef = document.querySelector('#single');
const loader = document.querySelector('.loader');
const divContainer = document.querySelector('.cat-info');

fetchBreeds()
  .then(array => {
    loader.classList.remove('is-hidden'); //сначала показываем лоадер
    breedsSelectRef.classList.add('is-hidden'); //пока грузится контент скрываем тэг select с результатами
    markupListBreeds(array); //отрисовываем разметку
  })
  .catch(data => {
    breedsSelectRef.classList.add('is-hidden');
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  //Делаем через finally() для того, чтобы сначала всё загрузилось и только потом именно в finally() делаем лоадер невидимым, а контейнер для отрисовки разметки видимым
  .finally(() => {
    //делаем через setTimeout, чтобы лоадер покрутился пол секунды и только потом отобразился select со списком пород. Чисто для визуального восприятия
    setTimeout(() => {
      loader.classList.add('is-hidden');
      breedsSelectRef.classList.remove('is-hidden');
    }, 500);
  });

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
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    //Логика работы через finally() описана выше в вызове метода fetchBreeds()
    .finally(() => {
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
      <img style="width: 400px" src=${data[0].url} alt="">
      <h3>${data[0].breeds[0].name}</h3>
      <p>${data[0].breeds[0].description}</p>
      <p><span class="span-breed">Temperament: </span>${data[0].breeds[0].temperament}</p>
   `;
}
