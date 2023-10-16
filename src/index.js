import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'center-top',
});

const breedselector = document.querySelector('.breed-select');
const loaderMsg = document.querySelector('.loader');
const loaderImg = document.querySelector('.gif-loader');
const errorMsg = document.querySelector('.error');
const textInfoBlock = document.querySelector('.cat-info');
loaderMsg.style.display = 'block';
loaderImg.style.display = 'block';
fetchBreeds()
  .then(data => {
    loaderMsg.style.display = 'none';
    loaderImg.style.display = 'none';
    console.log(data);
    breedselector.innerHTML = createSelectMarkup(data);
    breedselector.style.display = 'block';
  })
  .catch(err => {
    Notiflix.Notify.warning(
      'Oops! Something went wrong! Try reloading the page!'
    );
    errorMsg.style.display = 'block';
    loaderMsg.style.display = 'none';
    loaderImg.style.display = 'none';
  });

function createSelectMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}
function handleClick(event) {
  loaderMsg.style.display = 'block';
  loaderImg.style.display = 'block';

  textInfoBlock.innerHTML = '';
  fetchCatByBreed(event.currentTarget.value)
    .then(data => {
      loaderMsg.style.display = 'none';
      loaderImg.style.display = 'none';
      console.log(data);

      textInfoBlock.innerHTML = createMarkup(data);
    })
    .catch(err => {
      Notiflix.Notify.warning(
        'Oops! Something went wrong! Try reloading the page!'
      );
      errorMsg.style.display = 'block';
      loaderMsg.style.display = 'none';
      loaderImg.style.display = 'none';
    });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ url, breeds: [{ name, description, temperament }] }) =>
        `<img src="${url}" width='400px'>
        <div class="cat-info-text">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><span>Temperament:</span>${temperament}</p>
        </div>`
    )
    .join('');
}
breedselector.addEventListener('change', handleClick);
console.log(fetchBreeds());
console.log(fetchCatByBreed('abys'));
