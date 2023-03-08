'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
              <h3 class="country__name">${data.name.official}</h3>
              <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 1000000
      ).toFixed(1)} milliion people</p>
      <p class="country__row"><span>🗣️</span>${Object.values(
        data.languages
      )}</p>
      <p class="country__row"><span>💰</span>${Object.keys(data.currencies)}</p>
  </div>
  </article>
`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
///////////////////////////////////////
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
        <article class="country">
            <img class="country__img" src="${data.flags.svg}" />
                <div class="country__data">
                    <h3 class="country__name">${data.name.official}</h3>
                    <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000000
            ).toFixed(1)} milliion people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(
              data.languages
            )}</p>
            <p class="country__row"><span>💰</span>${Object.keys(
              data.currencies
            )}</p>
        </div>
        </article>
`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('turkey');
getCountryData('usa');
getCountryData('germany');
getCountryData('portugal');

*/

/*
const getCountryAndNeighbour = function (country) {
  //Ajax call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const neighbour = [...data.borders];
    if (!neighbour) return;

    //Ajax call country 2
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://restcountries.com/v3.1/alpha/${neighbour[0]}`
    );
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('turkey');
*/

// const request = fetch(`https://restcountries.com/v3.1/name/turkey`);
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};
/*
const getCountryData = function (country) {
  // country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      console.log(data);
      console.log(neighbour);

      // country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())

    .then(function (data) {
      console.log(data);
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.log(`${err} sorry!!`);
      renderError(`Something went wrong !! ${err.message} Try again...`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

*/
////////////
const getCountryData = function (country) {
  // country 1
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found '
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbour found');

      // country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })

    .then(function (data) {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.log(`${err} sorry!!`);
      renderError(`Something went wrong !! ${err.message} Try again...`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData('portugal');
});

////

// coding challenge

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}`));
};
whereAmI(52.508, 13.381);

///  Build a simple promises
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('LOTTERY DRAW IS HAPPENING');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('YOU WIN LOTTERY');
    } else {
      reject(new Error('YOU LOST YOUR MONEY'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisfiying settimeout

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
wait(2)
  .then(() => {
    console.log('I waited 2 seconds');
    return wait(1);
  })
  .then(() => console.log('ı waited for 1 seconds'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('PROBLEM')).catch(x => console.log(x));

///CLONE TEST
console.log('clone test');
