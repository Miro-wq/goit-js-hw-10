import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common['x-api-key'] = 'live_JPoam0RZFEIr8eokKzekS7HIt2LK2OoKkz2bJPYRJWgTaSAikbGrqGNxJ3OzQNJl';

const breedSelect = document.querySelector('.breed-select');
const loaderSelect = document.querySelector('.loader');
const errorSelect = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onSelectChanges);

function createCatList() {
  loaderSelect.classList.remove('is-hidden');
  breedSelect.classList.add('is-hidden');
  errorSelect.classList.add('is-hidden');

  fetchBreeds()
    .then(data => {
      const optionsList = data
        .map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join(' ');
      breedSelect.innerHTML = optionsList;
      new SlimSelect({
        select: breedSelect,
      });
      loaderSelect.classList.add('is-hidden');
      breedSelect.classList.remove('is-hidden');
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}
createCatList();

function onSelectChanges(event) {
  loaderSelect.classList.remove('is-hidden');
  catInfo.classList.add('is-hidden');
  const selectedBreedId = event.currentTarget.value;
  fetchCatByBreed(selectedBreedId)
    .then(data => {
      markupInfo(data);
      loaderSelect.classList.add('is-hidden');
      catInfo.classList.remove('is-hidden');
    })
    .catch(error => {
      loaderSelect.classList.add('is-hidden');
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function markupInfo(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const breedCard = `<img class="foto-cat" width = "360px" src="${url}" alt="${name}">
    <div class="text-part">
  <h2 class="cat-name">${name}</h2>
  <p class="cat-description">${description}</p>
  <p class="cat-temperament"><span class="temperament-label">Temperament:</span> ${temperament}</p>  </div>`;
  catInfo.innerHTML = breedCard;
}
//==========================DRAFTS============================

// dependecies > axios, slim-select, notiflix > import dependencies > set APi > select elements > addEventListner > fetch Cat > dropdown > cat info > function > init > stop


// async function getData() {
//     const url = "https://example.org/products.json";
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//       }
  
//       const json = await response.json();
//       console.log(json);
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
  
// const response = await fetch("https://example.org/post", {
//     method: "POST",
//     // ...
//   });
  
// const response = await fetch("https://example.org/post", {
//     body: JSON.stringify({ username: "example" }),
//     // ...
//   });
  
// create a clone of the request before sending it:
// const request1 = new Request("https://example.org/post", {
//     method: "POST",
//     body: JSON.stringify({ username: "example" }),
//   });
  
//   const request2 = request1.clone();
  
//   const response1 = await fetch(request1);
//   console.log(response1.status);
  
//   const response2 = await fetch(request2);
//   console.log(response2.status);

//https://api.thecatapi.com/v1/images/search?breed_ids=identificator_rasă

//function fetchCatByBreed(breedId)


//SLIM-SELECT
// new SlimSelect({
//     select: '#selectElement',
  
//     // Array of Option objects
//     data: [{ text: 'Value 1', value: 'value1' }],
  
//     // or
  
//     // Array of Optgroups and/or Options
//     data: [{ label: 'Optgroup Label', options: { text: 'Value 1', value: 'value1' } }],
//   })
// import SlimSelect from 'slim-select'

// new SlimSelect({
//   select: '#selectElement',
// })

// function toggleLoader(show) {
//     const loaderText = loaderSelect.querySelector('.loader-text');
//     if (show) {
//         loaderText.classList.remove('hidden-text');
//     } else {
//         loaderText.classList.add('hidden-text');
//     }
//     loaderSelect.classList.toggle('is-hidden', !show);
//     breedSelect.classList.toggle('is-hidden', show);
// }

// function dropDown(event) {
//     toggleLoader(true);
//     const breedSelectId = event.target.value;
//     fetchCatByBreed(breedSelectId)
//         .then(renderMarkup)
//         .catch(showError)
//         .finally(() => toggleLoader(false));
// }