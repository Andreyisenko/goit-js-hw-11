import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
const forM = document.querySelector('.feedback-form');
const gallerY = document.querySelector('.gallery');
const btN = document.querySelector('.but-sub');
const API_KEY = '47413156-c8c9abea8f6d88937b7892740';
let qData;
let promData;

// const params = new URLSearchParams({
//   key: API_KEY,
//   q: "dog",
// });

forM.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  qData = event.currentTarget.elements.photo.value.trim();
  console.log(event.currentTarget.elements.photo.value);
  searchData(`${qData}`);
}

function searchData(datA = '') {
  if (datA === '' || promData === 0) {
    iziToast.show({
      color: 'red',
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${qData}&image_type=photo&orientation=horizontal?safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      promData = data.hits.length;
      console.log(data.hits);
      console.log(promData);
      // if (data.hits.length === 0) {
      //     alert("ro")
      // }
      gallerY.innerHTML = createMarkup(data.hits);
    })
    .catch(error => {
      console.log(error);
    });

  function createMarkup(arr) {
    return arr
      .map(
        ({ id, webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `<li data-id="${id}" class="list-item">
    <img src="${webformatURL}" alt="${tags}" width="300"> </li>`
      )
      .join('');
  }
}
// let tot = []
// console.log(tot.length === [].length);
