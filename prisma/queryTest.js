require('dotenv').config();
// const bcrypt = require('bcrypt');
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();
// const SALT_ROUNDS = 5;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomDate(date, days) {
  const returnDate = new Date(date);
  returnDate.setDate(date.getDate() + days);
  return returnDate;
}

async function retrieveRooms() {
  const userReservationID = await prisma.user.findMany({
    where: {
      reservations: {
        some: {},
      },
    },
    select: {
      reservations: true,
    },
  });
  console.log(userReservationID.map((resObject) => {
    const { reservations } = resObject;
    const reservationsHotelID = reservations.map((reservation) => (reservation.paymentAmount));
    return reservationsHotelID;
  }));
}

retrieveRooms()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
