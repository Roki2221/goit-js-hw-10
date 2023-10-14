import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const breedselector = document.querySelector('.breed-select');
const loaderMsg = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');
const textInfoBlock = document.querySelector('.cat-info');
loaderMsg.style.display = 'block';
fetchBreeds()
  .then(data => {
    loaderMsg.style.display = 'none';
    breedselector.innerHTML = createSelectMarkup(data);
    breedselector.style.display = 'block';
    // console.log(data);
  })
  .catch(err => {
    errorMsg.style.display = 'block';
    loaderMsg.style.display = 'none';
  });

function createSelectMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}
function handleClick(event) {
  loaderMsg.style.display = 'block';
  textInfoBlock.innerHTML = '';
  fetchCatByBreed(event.currentTarget.value)
    .then(data => {
      loaderMsg.style.display = 'none';
      console.log(data);
      textInfoBlock.innerHTML = createMarkup(data);
    })
    .catch(err => {
      errorMsg.style.display = 'block';
      loaderMsg.style.display = 'none';
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
