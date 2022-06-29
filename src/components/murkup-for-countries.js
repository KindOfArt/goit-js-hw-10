export default function murkupForCountries({
  name: { official },
  flags: { svg },
}) {
  return ` <li class="country-list__item">
  <img
    src="${svg}"
    alt="flag"
    width="30"
    height="30"
    class="country-list__img"
  /><span class="country-list__name">${official}</span>
</li>`;
}
