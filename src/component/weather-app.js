import axios from 'axios';

class WeatherApp extends HTMLElement {
  connectedCallback() {
    this.render();
    this.getData();
  }

  render() {
    this.innerHTML = `
        <main>
            <div class="select">
                <select name="city" id="select"></select>
            </div>
            <div class="card">
                <span class="city"></span>
                <span class="temp"></span>
                <span class="weather"></span>
            </card>
        </main>
        `;
  }

  getData() {
    const url = 'https://cuaca-gempa-rest-api.vercel.app/weather/dki-jakarta';
    axios.get(url)
      .then((res) => {
        const nameCity = res.data.data.areas;

        // create option element
        const select = document.getElementById('select');
        nameCity.forEach((e) => {
          const option = document.createElement('option');

          option.innerText = e.description;
          select.appendChild(option);
        });

        // get data city
        function getDataCity() {
          nameCity.filter((e) => {
            const selectValue = document.getElementById('select').value;

            if (e.description === selectValue) {
              const city = document.querySelector('.city');
              const temp = document.querySelector('.temp');
              const weather = document.querySelector('.weather');

              city.innerText = e.description;
              temp.innerText = e.params[5].times[0].celcius.replace(/\s/g, '°');
              weather.innerText = e.params[6].times[0].name;
            }
          });
        }

        getDataCity();
        // select city
        select.addEventListener('change', getDataCity);
      })
      .catch((e) => e);
  }
}

customElements.define('weather-app', WeatherApp);
