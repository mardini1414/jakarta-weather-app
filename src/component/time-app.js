import moment from 'moment';

class TimeApp extends HTMLElement {
  connectedCallback() {
    this.render();
    this.getTime();
  }

  render() {
    this.innerHTML = `
        <header>
            <div class="time">
                <span class="clock"></span>
                <span class="date"></span>
            </div>
        </header>
        `;
  }

  getTime() {
    const time = document.querySelector('.time .clock');
    const date = document.querySelector('.time .date');

    date.innerText = moment().format('dddd');
    setInterval(() => {
      time.innerText = moment().format('HH:mm');
    }, 1000);
  }
}

customElements.define('time-app', TimeApp);
