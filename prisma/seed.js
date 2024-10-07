// import { PrismaClient } from '@prisma/client';

require('dotenv').config();
const bcrypt = require('bcrypt');
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();
const SALT_ROUNDS = 5;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloatStep(min, max, step) {
  const randomStepNumber = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;
  const randomStepFloat = randomStepNumber - 0.01;
  return randomStepFloat.toFixed(2);
}

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

const cityHotelObject = {};
for (const gov of governateArray) {
  for (const city of gov.city) {
    const hotelArray = [];

    for (let i = 0; i < 6; i += 1) {
      const hotelObject = {};
      hotelObject.name = `${gov.name}_${city.split(' ').join('_')}_hotel_${i}`;
      hotelArray.push(hotelObject);
    }
    cityHotelObject[city] = hotelArray;
  }
}

const roomArray = [];
for (let i = 0; i < 20; i += 1) {
  roomArray.push({
    number: i + 1,
    price: getRandomFloatStep(50, 150, 5),
  });
}

const nameArray = [
  'Ahmed', 'Khalil', 'Fatima', 'Al-Najjar', 'Omar', 'Haddad', 'Layla', 'Mansour', 'Zainab', 'Abdulrahman', 'Mohammed', 'Salah', 'Yasmin', 'Al-Harith', 'Ali', 'Jaber', 'Aisha', 'Kamal', 'Samir', 'Hassan', 'Nour', 'Al-Mutairi', 'Ibrahim', 'Saleh', 'Mariam', 'El-Shami', 'Amira', 'Zaki', 'Tarek', 'Mahmoud', 'Huda', 'Saif', 'Mustafa', 'Al-Taher', 'Farah', 'Abu-Saleh', 'Khaled', 'Fadel', 'Rana', 'Ibrahim', 'Youssef', 'Barakat', 'Leila', 'Tamer', 'Salem', 'Darwish', 'Dina', 'Matar', 'Rami', 'Ghanem',
];
const firstNameArray = nameArray.filter((element, index) => index % 2 === 0);
const lastNameArray = nameArray.filter((element, index) => index % 2 !== 0);
const firstNameArrayLen = firstNameArray.length;
const lastNameArrayLen = lastNameArray.length;

const amenityArray = [
  'Cable TV', 'Lockbox', 'Internet', 'Other pet(s)', 'Smartlock', 'Private living room', 'Pets live on this property', 'Self Check-In', 'TV', 'Cat(s)', 'Hot tub', 'Gym', 'Essentials', 'Heating', 'Family/kid friendly', 'Wireless Internet', 'Pets allowed', 'Kitchen', 'Doorman Entry', 'Lock on bedroom door', 'Washer', 'Wheelchair accessible', 'Elevator in building', 'Fire extinguisher', 'Free parking on premises', '24-hour check-in', 'Keypad', 'Air conditioning', 'Suitable for events', 'Laptop friendly workspace', 'Breakfast', 'Smoke detector', 'Shampoo', 'Safety card', 'Iron', 'Dog(s)', 'Hangers', 'Buzzer/wireless intercom', 'Carbon monoxide detector', 'Indoor fireplace', 'Private entrance', 'Dryer', 'Doorman', 'Hair dryer', 'Pool', 'Smoking allowed', 'First aid kit',
];

const reviewArray = [
  'Amazing stay, highly recommended!', 'The room was clean and cozy.', 'Staff were friendly but service was slow.', 'Had a wonderful time, will come again!', 'Room service could be improved.', 'The location is perfect for sightseeing.', 'Great value for money.', 'The breakfast was delicious and varied.', 'I expected more from the amenities.', 'A quiet and relaxing atmosphere.', 'Fantastic view from the room.', 'Wi-Fi was unreliable at times.', 'The bed was very comfortable.', 'Overpriced for what you get.', 'The spa was incredible!', 'The air conditioning wasn’t working well.', 'Loved the pool area!', 'The bathroom was too small.', 'Check-in was quick and easy.', 'The room smelled a bit musty.', 'Best hotel in the city!', 'The elevator was always slow.', 'Staff went above and beyond!', 'The room decor was outdated.', 'Loved the complimentary snacks.', 'The gym was too small and crowded.', 'Perfect for a weekend getaway.', 'The pillows were too soft for me.', 'Housekeeping was excellent.', 'I wouldn’t stay here again.', 'The restaurant was way too expensive.', 'Parking was convenient and easy.', 'The hotel bar had great cocktails.', 'Noisy neighbors kept me up all night.', 'Everything was spotlessly clean.', 'The location was too far from the city center.', 'Fantastic staff, very accommodating.', 'The shower pressure was too low.', 'The hotel exceeded my expectations!', 'The rooms were a bit dated.', 'Perfect place for business travelers.', 'Not worth the price.', 'The breakfast buffet was outstanding.', 'Had a great time at the rooftop bar.', 'Customer service needs improvement.', 'The view from the room was breathtaking.', 'The walls were paper-thin.', 'The beds were heavenly!', 'Too many hidden fees at checkout.', 'The hotel lobby was beautiful.', 'The pool was closed during my stay.', 'Would definitely come back again.', 'The noise from the street was unbearable.', 'Room size was smaller than expected.', 'The hotel had a great atmosphere.', 'The concierge was incredibly helpful.', 'Loved the modern design of the room.', 'The hotel felt a bit understaffed.', 'The AC was too loud.', 'Overall, a pleasant experience.', 'The food at the restaurant was amazing.', 'No hot water during my stay.', 'The front desk staff were very rude.', 'Enjoyed the quiet and peaceful location.', 'The minibar was overpriced.', 'The hotel provided excellent amenities.', 'I expected more from the luxury suite.', 'The shuttle service was very convenient.', 'Had an amazing anniversary here!', 'Room service was quick and efficient.', 'The decor felt very old-fashioned.', 'The bathroom was spotless.', 'The hotel had a great central location.', 'The bed linens were not clean.', 'Felt like a home away from home.', 'Too expensive for what you get.', 'The rooftop pool was fantastic.', 'The lobby smelled strange.', 'Wouldn’t hesitate to recommend!', 'I had a lovely stay here.', 'Room keycards kept malfunctioning.', 'The hotel gym was well-equipped.', 'The bathtub was a nice touch.', 'Room felt cramped and outdated.', 'Couldn’t ask for better service.', 'Loved the complimentary breakfast.', 'The location made up for the small room.', 'Great hotel for families.', 'Could hear everything from the hallway.', 'The restaurant menu was limited.', 'The view alone is worth the price.', 'The staff were not very helpful.', 'A very comfortable and pleasant stay.', 'The hotel exceeded all my expectations.', 'The bathroom had mold in the corners.', 'The hotel bar was lively and fun.', 'The room temperature was hard to control.', 'The hotel had great event spaces.', 'The coffee machine in the room didn’t work.', 'Excellent location, right in the city center.', 'The TV remote was broken.', 'The breakfast selection was very poor.', 'Amazing experience, can’t wait to return.', 'Felt unsafe in the neighborhood.', 'The curtains didn’t block out the light.', 'The room was very stylish and modern.', 'Parking was too expensive.', 'The hotel had great conference facilities.', 'We had a fantastic honeymoon here.', 'Too much noise from other rooms.', 'Loved the proximity to the beach.', 'The pool area was well-maintained.', 'The staff were always smiling and friendly.', 'Room was too small for a family of four.', 'Felt very luxurious and high-end.', 'The hotel charged for Wi-Fi, unacceptable!', 'Great service, but the room was just okay.', 'The hotel restaurant was top-notch.', 'The hot tub was closed during our stay.', 'Wonderful ambiance throughout the hotel.', 'Rooms need better soundproofing.', 'The reception staff were very accommodating.', 'The towels were old and rough.', 'The hotel had a very chic vibe.', "Wouldn't stay here again.", 'The pool was the highlight of our trip.', 'The breakfast wasn’t as good as expected.', 'Loved the spa services.', 'Had issues with the room key every day.', 'The decor in the room was beautiful.', 'Couldn’t get enough of the ocean view.', 'The elevators took forever!', 'The hotel’s location is unbeatable.', 'Room service was cold when it arrived.', 'The hotel was under construction, noisy.', 'Had a great stay despite the rain.', 'The lobby was very impressive.', 'Staff could have been more attentive.', 'The hotel felt very secure.', 'The coffee at breakfast was terrible.', 'Loved the rooftop restaurant.', 'It was a bit too far from local attractions.', 'The hotel had beautiful architecture.', 'Room was comfortable but a bit plain.', 'Had an issue with the air conditioning.', 'The staff handled my complaints well.', 'The bed was too firm for my liking.', 'The hotel felt very grand and elegant.', 'The hotel gym was fantastic.', 'The pool was freezing cold.', 'The staff were not very welcoming.', 'Enjoyed every minute of our stay.', 'Room wasn’t ready when we arrived.', 'The pillows were flat and uncomfortable.', 'The beach was just steps away.', 'The carpet in the room was stained.', 'The view from our room was spectacular.', 'The hotel breakfast was great!', 'Service at the bar was slow.', 'A bit too noisy at night.', 'The spa treatments were heavenly.', 'Room was clean and modern.', 'The hotel restaurant had amazing food.', 'It took too long to get checked in.', 'The minibar had a great selection.', 'Felt right at home here.', 'I had higher expectations for the price.', 'The service was impeccable.', 'Great hotel, would come back again.', 'The room wasn’t as clean as expected.', 'The poolside service was excellent.', 'The location is unbeatable.', 'The room had a strange odor.', 'Staff made our stay unforgettable.', 'The room had a wonderful balcony.', 'The hotel was underwhelming.', 'Room was comfortable and spacious.', 'The hot water ran out quickly.', 'A very cozy and welcoming place.', 'The hotel was way too noisy.', 'The Wi-Fi speed was impressive.', 'The bathroom was luxurious.', 'The staff really made the stay enjoyable.', 'The bed was so comfortable!', 'The breakfast was just okay.', 'The front desk staff were lovely.', 'Wouldn’t hesitate to stay here again.', 'Everything was perfect, loved it!', 'The room was cozy and the view was breathtaking!', 'Loved the modern decor, but the bathroom was a bit small.', 'Great value for money – clean, comfortable, and quiet.', 'The bed was super comfortable, but the room was too hot.', 'Amazing location, but could use better soundproofing.', 'Service was excellent, and the room was spotless.', 'The view of the city skyline was stunning from the balcony.', 'Spacious and clean, but the Wi-Fi was unreliable.', 'Perfect for a short stay – had everything we needed.', 'The staff was friendly, and the room was well-maintained.', 'The air conditioning worked well, and the bed was huge!', 'Loved the vintage charm of the room, but it smelled musty.', 'The bathroom amenities were top-notch!', 'The lighting in the room was too dim for my liking.', 'A great spot for a weekend getaway – highly recommend!', 'The room had a fantastic view of the beach, loved it!', 'It was clean and quiet, but the mattress was too firm.', 'The room was spacious, but the shower pressure was weak.', 'Fantastic room service and luxurious linens!', 'The hotel was gorgeous, but the room was slightly outdated.', 'Our room had an amazing sunrise view over the mountains.', 'The minibar was well-stocked, and the bed was so comfy!', 'Beautiful room, but a bit noisy from the street below.', 'The housekeeping team did a fantastic job every day.', 'Great location and comfortable stay for a quick business trip.', 'Loved the large windows and the bright, airy feel of the room.', 'The room was clean, but the furniture was a bit worn out.', 'Perfect spot for a romantic staycation!', 'The decor was a bit dated, but overall a pleasant stay.', 'Loved the proximity to attractions, but the room was too small.',
];

async function main() {
  const govObject = await prisma.governate.findMany();
  const hotelObject = await prisma.hotel.findMany();
  const roomObject = await prisma.room.findMany();
  const amenityObject = await prisma.amenity.findMany();
  const userObject = await prisma.user.findMany();
  const reviewObject = await prisma.review.findMany();

  if (govObject.length === 0) {
    for (const object of governateArray) {
      const governate = await prisma.governate.create({
        data: {
          name: object.name,
          cities: {
            create: object.city.map((cityName) => ({ name: cityName })),
          },
        },
      });
    }
  }

  if (hotelObject.length === 0) {
    const cityArray = await prisma.city.findMany();
    for (const city of cityArray) {
      const newCity = await prisma.city.update({
        where: {
          id: city.id,
        },
        data: {
          hotels: {
            create: cityHotelObject[`${city.name}`].map((hotel) => hotel),
          },
        },
      });
    }
  }

  if (roomObject.length === 0) {
    const allHotels = await prisma.hotel.findMany();
    for (const hotel of allHotels) {
      const newHotel = await prisma.hotel.update({
        where: {
          id: hotel.id,
        },
        data: {
          rooms: {
            create: roomArray.map((room) => room),
          },
        },
      });
    }
  }

  if (userObject.length === 0) {
    for (let i = 0; i < 100; i += 1) {
      const newUser = {};
      newUser.firstName = firstNameArray[getRandomInt(0, firstNameArrayLen - 1)];
      newUser.lastName = lastNameArray[getRandomInt(0, lastNameArrayLen - 1)];
      newUser.username = `${newUser.firstName}_${newUser.lastName}_${i}`;
      const plainPassword = newUser.username;
      newUser.password = await bcrypt.hash(plainPassword, SALT_ROUNDS);
      const userInsert = await prisma.user.create({
        data: newUser,
      });
    }
  }

  if (amenityObject.length === 0) {
    const amenityObjectTempArray = [];

    for (const amenityString of amenityArray) {
      const newAmenity = await prisma.amenity.create({
        data: {
          name: amenityString,
        },
      });
      amenityObjectTempArray.push(newAmenity);
    }

    const numAmenities = Math.floor(amenityObjectTempArray.length / 4);
    // const startIndex = getRandomInt(0, amenityObjectTempArray.length - 1)
    for (const room of roomObject) {
      const uniqueAmenityIdConnectArray = [];
      const uniqueAmenityMap = new Map();

      for (let i = 0; i < numAmenities; i += 1) {
        const randomIndex = getRandomInt(0, amenityObjectTempArray.length - 1);
        const idKey = amenityObjectTempArray[randomIndex].id;
        if (uniqueAmenityMap.has(idKey)) {
          i -= 1;
        } else {
          uniqueAmenityMap.set(idKey, 1);
          const newObject = {
            id: idKey,
          };
          uniqueAmenityIdConnectArray.push(newObject);
        }
      }

      // for (let i = startIndex; i < startIndex + numAmenities; i += 1) {
      //   if (i === amenityArray.length - 1 && startIndex + numAmenities > amenityArray.length) {
      //     for (let j = 0; j < (startIndex + numAmenities) - amenityArray.length ;j += 1) {
      //       const newObject = {
      //         id: amenityObjectTempArray[j].id
      //       }
      //       uniqueAmenityIdConnectArray.push(newObject)
      //     }
      //   }
      //   else {
      //     const newObject = {
      //         id: amenityObjectTempArray[j].id
      //       }
      //     uniqueAmenityIdConnectArray.push(newObject)
      //   }
      // }

      const newRoomAmenitiesConnect = await prisma.room.update({
        where: { id: room.id },
        data: {
          amenities: {
            connect: uniqueAmenityIdConnectArray,
          },
        },
      });
      console.log(uniqueAmenityIdConnectArray);
    }
  }

  // if (reviewObject.length === 0){
  //   for (const review of reviewArray) {
  //     const lowEndIndex = getRandomInt(0, Math.floor(userObject.length / 2))
  //     const highEndIndex = getRandomInt(lowEndIndex, userObject.length - 1)
  //     for (let i = lowEnd; i < highEndIndex; i += 1) {
  //       const reviewDate = new Date()
  //       reviewDate.setDate(reviewDate.getDate() - i)
  //       const reviewObject = {
  //         text: review,
  //         reviewDate: reviewDate,
  //         userID: userObject[i].id,
  //         hotelID: hotelObject[i].id,
  //       }
  //       const dbReviewObject = await prisma.review.create({
  //         data: reviewObject
  //       })
  //     }
  //   }

  const roomArray = await prisma.room.findMany({
    include: {
      amenities: true,
    },
  });

  for (const room of roomArray) {
    console.log(room.amenities);
    console.log('------------------------------------------------------------');
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
