import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createMarkup from './js/render-functions';
// import searchData from './js/pixabay-api';

const forM = document.querySelector('.feedback-form');
const gallerY = document.querySelector('.gallery');
let spn = document.querySelector('.loader');

const API_KEY = '47413156-c8c9abea8f6d88937b7892740';
let qData;
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

forM.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  spn.classList.add('is-hidden');
  event.preventDefault();
  qData = event.currentTarget.elements.photo.value.trim();
  searchData(`${qData}`);
  event.target.reset();

  function searchData(datA = '') {
    if (datA === '') {
      iziToast.show({
        color: 'red',
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      spn.classList.remove('is-hidden');
      return;
    }
    const params = new URLSearchParams({
      key: API_KEY,

      q: `${qData}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    });
    // function fetcH() {

    
    fetch(`https://pixabay.com/api/?${params}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(data => {
        if (!data.hits.length) {
          iziToast.show({
            color: 'red',
            position: 'topRight',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
          });
          spn.classList.remove('is-hidden');
          return;
        }

        gallerY.insertAdjacentHTML('afterbegin', createMarkup(data.hits));
        lightbox.refresh();
        spn.classList.remove('is-hidden');
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => console.log('ok'));
  }
}
