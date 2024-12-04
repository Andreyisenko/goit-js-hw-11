import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const forM = document.querySelector('.feedback-form');
const gallerY = document.querySelector('.gallery');
const btN = document.querySelector('.but-sub');
const API_KEY = '47413156-c8c9abea8f6d88937b7892740';
let qData;
let promData;
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

forM.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  qData = event.currentTarget.elements.photo.value.trim();
  //   console.log(event.currentTarget.elements.photo.value);
  searchData(`${qData}`);
  event.target.reset();
}

function searchData(datA = '') {
  if (datA === '') {
    iziToast.show({
      color: 'red',
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }
  const params = new URLSearchParams({
    key: API_KEY,

    q: `${qData}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  fetch(`https://pixabay.com/api/?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // console.log(response);

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
        return;
      }
      promData = data.hits;
      console.log(promData);
      //   gallerY.innerHTML = createMarkup(data.hits);
      gallerY.insertAdjacentHTML('afterbegin', createMarkup(data.hits));
      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => console.log('ok'));

  function createMarkup(arr) {
    return arr
      .map(
        ({
          id,
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `<li data-id="${id}" class="gallery-item">
            <a href=${largeImageURL} class="gallery-link">
            <img src=${webformatURL} class="gallery-image" alt=${tags}> 
            <div class="wrap"><h2 class="title-like">Likes <span class="span-text"> ${likes} </span></h2>
             <h2 class="title-views">Views <span class="span-text"> ${views} </span></h2>
             <h2 class="title-comments">Comments <span class="span-text">${comments}</span> </h2>
             <h2 class="title-downloads">Downloads <span class="span-text">${downloads} </span></h2></div>
</a>
            </li>`
      )
      .join('');
  }
}

// console.log(lightbox);
