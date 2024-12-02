// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";



// iziToast.show({
//     color: 'red',
//     position: 'topRight',
//     message: 'Sorry, there are no images matching your search query. Please try again!',
//   });



// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

const btN = document.querySelector(".but-sub")
btN.addEventListener("click", hundleClick)

function hundleClick (event) {
    event.preventDefault()
    console.log(btN);

}