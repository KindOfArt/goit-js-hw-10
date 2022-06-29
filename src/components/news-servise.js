import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://restcountries.com/v3.1';
const SEARCH_PARAM = 'name';
const SEARCH_FILTER = 'fields=name,capital,population,flags,languages';

export default class NewsApiServise {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    const url = `${BASE_URL}/${SEARCH_PARAM}/${this.searchQuery}?${SEARCH_FILTER}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(
            Notify.failure('Oops, there is no country with that name')
          );
        }
        return response.json();
      })
      .catch(error => error);
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
