const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class RoomController {
  static async getAllRooms(request, response) {
    console.log(request.query);

    if (Object.entries(request.query).length > 0) {
      if (request.query.city) {
        const cityRoomsArray = await prisma.room.findMany({
          where: {
            hotel: {
              city: {
                name: request.query.city,
              },
            },
          },
        });
        response.json(cityRoomsArray);
      } else if (request.query.governate) {
        const governateRoomsArray = await prisma.room.findMany({
          where: {
            hotel: {
              city: {
                governate: {
                  name: request.query.governate,
                },
              },
            },
          },
        });
        response.json(governateRoomsArray);
      }
    } else {
      const allRooms = await prisma.room.findMany();
      // pagination still under construction
      response.json(allRooms);
      // response.send('Under construction');
    }
  }

  static async getOneRoom(request, response) {
    const roomResult = await prisma.room.findUnique({
      where: {
        id: request.params.roomID,
      },
    });
    // pagination still under construction
    response.json(roomResult);
    // response.send('Under construction');
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
