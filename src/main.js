// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";

// iziToast.show({
//     color: 'red',
//     position: 'topRight',
//     message: 'Sorry, there are no images matching your search query. Please try again!',
//   });

// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
const forM = document.querySelector('.feedback-form');
const gallerY = document.querySelector('.gallery');
const btN = document.querySelector('.but-sub');
const API_KEY = '47413156-c8c9abea8f6d88937b7892740';
let qData;

// const params = new URLSearchParams({
//   key: API_KEY,
//   q: "dog",
// });

forM.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  if (qData == ''.trim()) {
    return;
  }
  qData = event.currentTarget.elements.photo.value;
  event.preventDefault();
  console.log(event.currentTarget.elements.photo.value);
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
      console.log(data.hits);
if (data.hits === "" ) {
    
}
      gallerY.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    })
    .catch(error => {
      console.log(error);
    });

  function createMarkup(arr) {
    return arr
      .map(
        ({ id, previewURL, tags }) => `<li data-id="${id}" class="list-item">
    <img src="${previewURL}" alt="${tags}" width="300"> </li>`
      )
      .join('');
  }
}
