// import { PrismaClient } from '@prisma/client';

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const governateArray = [
  {
    name: 'Cairo',
    city: ['Nasr city', 'Heliopolis', 'Shubra', 'Maadi'],
  },
  {
    name: 'Alexandria',
    city: ['Borg Al arab', 'Abu Qir', 'Montazah', 'Sidi Gaber'],
  },
  {
    name: 'Giza',
    city: ['6th of october', 'Sheikh Zayed', 'Al-Haram', 'Imbaba'],
  },
  {
    name: 'Minya',
    city: ['Minya', 'Malawi', 'Beni Muzar', 'Abu Qurqas'],
  },
  {
    name: 'Sharqia',
    city: ['Zagazig', 'Mit-Ghamr', '10th of Ramadan', 'Al Ibrahimiya'],
  },
  {
    name: 'Suez',
    city: ['Al Ghanayen', 'Suez', 'Faisal', 'Al Arbaeen'],
  },
];

const hotelArray = [];
for (const object of governateArray) {
  for (const city of object.city) {
    const hotelObject = {};
  }
}

// const hotelArray = governateArray.map(((gov) => {
//   const hotelGov = {};
//   hotelGov.name = gov.name;
//   hotelGov.hotels = [];
//   for (const city of gov.city) {
//     const name = `${gov.name}_${city.split(' ').join('_')}_hotel`;
//     hotelGov.hotels.push(name);
//   }
//   return hotelGov;
// }));

async function main() {
  const objectArray = [];
  let index = 0;
  for (const object of governateArray) {
    const governate = await prisma.governate.create({
      data: {
        name: object.name,
        cities: {
          create: object.city.map((cityName) => ({ name: cityName })),
        },
      },
    });
    objectArray.push(governate);
    index += 1;
  }

  for (const object of objectArray) {
    console.log(object);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
