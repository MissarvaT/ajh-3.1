import Listeners from './listener';

export default class Game {
  constructor(fieldLength) {
    this.fieldLength = fieldLength;
    this.listeners = new Listeners();
  }

  init() {
    const { body } = document;
    const counters = document.createElement('div');
    counters.classList.add('counters');
    body.appendChild(counters);
    counters.innerHTML = `
      <div class ="success-heats">
        <div>Убито гоблинов: </div>
          <div class ="count">0</div>
      </div>
      <div class="failure-heats">
        <div>Упущено гоблинов: </div>
          <div class="count">0</div>
      </div>`;
    const field = document.createElement('div');
    field.classList.add('field');
    body.appendChild(field);

    for (let i = 0; i < this.fieldLength; i += 1) {
      const container = document.createElement('div');
      container.classList.add('hole');
      const img = document.createElement('img');
      img.src = 'src/img/tile.png';
      container.appendChild(img);
      field.appendChild(container);
    }
    const character = document.createElement('img');
    character.src = 'src/img/goblin.png';
    character.classList.add('character');
    const array = Array.from(field.getElementsByClassName('hole'));

    window.addEventListener('load', () => {
      const position = this.generatePosition();
      array[position].insertAdjacentElement('afterbegin', character);
    });

    this.move(array, character);
    character.addEventListener('click', () => {
      this.listeners.successCount();
      character.classList.add('hidden');
    });

    field.addEventListener('click', (event) => {
      if (!(event.target.classList.contains('character'))) { this.listeners.failureCount(); }
    });
  }

  move(array, character) {
    // eslint-disable-next-line no-unused-vars
    const timer = setInterval(() => {
      let newPosition = this.generatePosition();
      if (array[newPosition].contains(character)) {
        if (newPosition === 15) {
          newPosition = 5;
        } else {
          newPosition += 1;
        }
      }
      character.remove();
      character.classList.remove('hidden');
      array[newPosition].insertAdjacentElement('afterbegin', character);
    }, 1000);
  }

  generatePosition() {
    const min = 0;
    const max = Math.floor(this.fieldLength);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
