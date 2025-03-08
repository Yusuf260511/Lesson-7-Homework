const countriesContainer = document.getElementById('countriesContainer');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');

async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        console.log(countries);
        displayCountries(countries);
        searchInput.addEventListener('input', () => searchCountries(countries));
        filterSelect.addEventListener('change', () => filterCountries(countries));
    } catch (error) {
        console.log('error', error);
    }
}

function displayCountries(countries) {
    countriesContainer.innerHTML = '';
    countries.forEach(country => {
        const card = document.createElement('div');
        card.classList.add('country-card');
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
        `;
        countriesContainer.appendChild(card);
    });
}

fetchCountries();

function searchCountries(countries) {
    const inputValue = searchInput.value.toLowerCase();
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(inputValue));
    displayCountries(filtered);
}

function filterCountries(countries) {
    const filterValue = filterSelect.value.toLowerCase();
    if (filterValue === 'all') { 
        displayCountries(countries);
    } else {
        const filtered = countries.filter(country => country.region.toLowerCase() === filterValue);
        displayCountries(filtered);
    }
}