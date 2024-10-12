const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class HotelController {
  static async getAllHotels(request, response) {
    const allHotels = await prisma.hotel.findMany();
    response.send(allHotels);
  }

  static async getHotelRooms(request, response) {
    const hotelRooms = await prisma.hotel.findMany({
      where: {
        id: request.params.hotelID,
      },
      select: {
        rooms: true,
      },
    });
    response.json(hotelRooms[0]);
  }
}

module.exports = HotelController;
