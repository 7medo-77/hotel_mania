const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class RoomController {
  static async getAllRooms(request, response) {
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
      response.send(cityRoomsArray);
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
