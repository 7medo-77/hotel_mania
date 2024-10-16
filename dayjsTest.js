const dayjs = require('dayjs');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const currDate = dayjs(); // .toDate();
const randomInt = getRandomInt(-10, -50);
const randomReservationFromDate = currDate.subtract(randomInt, 'day');
const randomReservationToDate = currDate.subtract(getRandomInt(-20, 15), 'day');
console.log(randomReservationToDate);
console.log(randomReservationFromDate);

console.log(randomReservationToDate.diff(randomReservationFromDate, 'day'));
// if (randomReservationToDate.diff(randomReservationFromDate, 'day'))
