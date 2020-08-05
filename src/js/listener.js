/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
export default class Listeners {
  successCount() {
    const successCount = document.querySelector('.success-heats .count');
    let count = successCount.innerText;
    count = Number(count);
    count += 1;
    successCount.innerText = count;
  }

  failureCount() {
    const failureCount = document.querySelector('.failure-heats .count');
    let count = failureCount.innerText;
    count = Number(count);
    count += 1;
    failureCount.innerText = count;
    if (count >= 5) {
      this.newGame();
    }
  }

  newGame() {
    alert('Game over!');
    const counters = Array.from(document.querySelectorAll('.counters .count'));
    counters.forEach((el) => el.innerText = 0);
  }
}
