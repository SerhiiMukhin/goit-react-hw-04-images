import axios from "axios";

const API_KEY = '32648236-214cf230cab87b8c686639ba9';

export function fetchImages(searchQuery, page) {
    return axios.get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
}