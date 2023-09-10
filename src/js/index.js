import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import {createMarkup} from "./markup"
const selectors = {
    form: document.querySelector(".js-search-form"),
    gallery: document.querySelector(".gallery"),
  loadMoreBtn:
    document.querySelector(".js-load-more")
}
const lightbox = new SimpleLightbox('.gallery a',{
  captionDelay: 250,
  enableKeyboard: true,
  showCounter: false,
})

let page = 1
let searchQuery = null

selectors.form.addEventListener("submit", hendlerSubmit)
selectors.loadMoreBtn.addEventListener("click", hendlerClick)

async function hendlerClick() {
    page += 1
    const data = await serviceGetImages(searchQuery, page)
  selectors.gallery.insertAdjacentHTML("beforeend", createMarkup(data))
  lightbox.refresh()
}

async function hendlerSubmit(evt) {
  evt.preventDefault()
    searchQuery = evt.currentTarget.elements.searchQuery.value.trim()
    try {
        const data = await serviceGetImages(searchQuery)
      selectors.gallery.innerHTML = createMarkup(data)
      lightbox.refresh()
      page = 1
    } catch (error) {
        console.log(error);
    } finally {
        evt.target.elements.searchQuery.value = ""
    }
}

async function serviceGetImages(searchQuery,currentPage = 1) {
  const BASE_URL = "https://pixabay.com/api/"
  if (searchQuery === "") {
    return Notiflix.Notify.failure("Sorry, it's invalid request. Please try again.")
  }
    const response = await axios.get(`${BASE_URL}`, {
        params: {
            key: "39333428-d2e3585d2c4254c6d1ca792d8",
            q: searchQuery,
            image_type: "photo",
            image_type: "horizontal",
            safesearch: true,
            per_page: 40,
            page: currentPage
        }
    });
    const objArr = response.data.hits;
  const totalHits = response.data.totalHits
  // if (searchQuery === "") {
  //    throw Error( Notiflix.Notify.failure("Sorry, it's invalid request. Please try again."))
  // }
    if (objArr.length === 0) {
        selectors.gallery.innerHTML = ""
        selectors.loadMoreBtn.classList.replace("load-more", "load-more-hidden")
        throw Error( Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'))
    }
    selectors.loadMoreBtn.classList.replace("load-more-hidden", "load-more")
    if (page * 40 >= totalHits) {
        selectors.loadMoreBtn.classList.replace("load-more", "load-more-hidden")
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    if (page === 1) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    return objArr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return {webformatURL, largeImageURL, tags, likes, views, comments, downloads}
    })
}