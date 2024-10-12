const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class RoomController {
  static async getAllRooms(request, response) {
    const allRooms = await prisma.room.findMany();
    // pagination still under construction
    // response.send(allHotels);
    response.send('Under construction');
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
