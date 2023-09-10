// import axios from "axios";
// import Notiflix from 'notiflix';
// export async function serviceGetImages(searchQuery, currentPage = 1) {
//     const BASE_URL = "https://pixabay.com/api/"
//     const response = await axios.get(`${BASE_URL}`, {
//         params: {
//             key: "39333428-d2e3585d2c4254c6d1ca792d8",
//             q: searchQuery,
//             image_type: "photo",
//             image_type: "horizontal",
//             safesearch: true,
//             per_page: 40,
//             page: currentPage
//         }
//     });
//     const objArr = response.data.hits;
//     totalHits = response.data.totalHits
//   if (searchQuery === "") {
//      throw Error( Notiflix.Notify.failure("Sorry, it's invalid request. Please try again."))
//   }
//     if (currentPage === 1 && objArr.length !== 0) {
//         Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//     }
//     return objArr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//         return {webformatURL, largeImageURL, tags, likes, views, comments, downloads}
//     })
// }