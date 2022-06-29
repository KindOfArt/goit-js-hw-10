import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewsApiServise from './components/news-servise';
import murckupForCountry from './components/murkup-for-country';
import murkupForCountries from './components/murkup-for-countries';
import './css/styles.css';

const newsApiServise = new NewsApiServise();
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  if (e.target.value === '') {
    removeMurkup();
    return;
  }

  removeMurkup();

  const searchValue = e.target.value.trim();

  newsApiServise.query = searchValue;

  newsApiServise
    .fetchCountries()
    .then(countries => {
      if (countries.length > 10) {
        throw new Error();
      }

      if (countries.length === 1) {
        return refs.countryInfo.insertAdjacentHTML(
          'beforeend',
          countries.map(murckupForCountry).join('')
        );
      }
      if (countries.length > 1 && countries.length < 10) {
        return refs.countryList.insertAdjacentHTML(
          'beforeend',
          countries.map(murkupForCountries).join('')
        );
      }
    })
    .catch(err => {
      if (err.message === '404' || err.message === '500') {
        return Notify.failure('Oops, there is no country with that name');
      }
      return Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    });
}

function removeMurkup() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
