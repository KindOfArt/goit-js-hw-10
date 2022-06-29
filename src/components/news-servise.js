const BASE_URL = 'https://restcountries.com/v3.1';
const SEARCH_PARAM = 'name';
const SEARCH_FILTER = 'fields=name,capital,population,flags,languages';

export default class NewsApiServise {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    const url = `${BASE_URL}/${SEARCH_PARAM}/${this.searchQuery}?${SEARCH_FILTER}`;

    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
    // .then(response => response.json())
    // .then(dataResult => dataResult);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
