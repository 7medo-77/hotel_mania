const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class RoomController {
  static async getAllRooms(request, response) {
    if (request.query.city) {
      const stateRooms = await prisma.city.findMany({
        where: {
          name: request.query.city,
        },
        select: {
          hotels: {
            select: {
              rooms: true,
            },
          },
        },
      });
      const hotelObjectArray = stateRooms[0].hotels;

      const roomHotelObjectArray = hotelObjectArray.map((hotelObject) => (hotelObject.rooms));

      console.log(roomHotelObjectArray.length);
      const roomObjectArray = roomHotelObjectArray.reduce((accumulator, currentValue) => {
        // console.log(typeof (accumulator));
        accumulator.push(currentValue);
        return accumulator;
      });

      // for (const roomObject of roomObjectArray) {
      //   console.log(typeof (roomObject));
      // }

      // response.send(stateRooms[0]);
      // response.send(roomObjectArray);
      // response.send(hotelObjectArray);
      response.send(roomHotelObjectArray);
    } else {
      const allRooms = await prisma.room.findMany();
      // pagination still under construction
      response.send(allRooms);
      // response.send('Under construction');
    }
  }

  static async getRoomAmenities(request, response) {
    const roomAmenities = await prisma.room.findMany({
      where: {
        id: request.params.roomID,
      },
      select: {
        amenities: {
          select: {
            id: true,
            iconURL: true,
            name: true,
          },
        },
      },
    });
    response.json(roomAmenities[0]);
  }
}

module.exports = RoomController;
