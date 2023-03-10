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

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
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

btn.addEventListener('click', whereAmI());

// Coding challenge
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};
let currentImage;
createImage('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(err => console.error(err));
*/
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (country) {
  try {
    const pos = await getPosition();
    const { latitiude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();
    console.log(dataGeo);
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
    return `You are in ${dataGeo.country} ${dataGeo.city}`;
  } catch (err) {
    console.error(`${err}`);
    renderError(`something wnet wrong ${err.message}`);

    // reject promise returned from async function
    throw err;
  }
};

console.log(1);
// whereAmI('turkey')
//   .then(city => console.log(`2:${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log(3));

(async function () {
  try {
    const city = await whereAmI('turkey');
    console.log(`2:${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log(3);
})();

// Promise Combinatore all,race,allSettled,any
// Promise.all tüm promiseleri döndürür ama bir tanesi bile hatalıysa kısa devre yapar
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/turkey`),

    getJSON(`https://restcountries.com/v3.1/name/canada`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('Request took too long!'));
    }, sec * 100);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/canada`),
  timeout(1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// promise.allSettled
//asla kısa devre yapmaz tüm promiselri döndürür.all dan farkı budur

Promise.allSettled([
  Promise.resolve('succes'),
  Promise.reject('ERROR'),
  Promise.resolve('succes'),
  Promise.resolve('another succes'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('succes'),
  Promise.reject('ERROR'),
  Promise.resolve('succes'),
  Promise.resolve('another succes'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//Promise.any [ES2021]
// ilk yerine getirilen promise i döndürür
Promise.any([
  Promise.resolve('succes1'),
  Promise.reject('ERROR'),
  Promise.resolve('succes2'),
  Promise.resolve('another succes'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
