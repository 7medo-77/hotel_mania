const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class HotelController {
  static async getAllHotels(request, response) {
    const allHotels = await prisma.hotel.findMany();
    response.send(allHotels);
  }

  static async getHotelRooms(request, response) {
    const hotelRooms = await prisma.room.findMany({
      where: {
        hotelID: request.params.hotelID,
        isReserved: false,
      },
    });
    response.json(hotelRooms);
  }

  static async getHotelRoomAmenities(request, response) {
    const hotelRooms = await prisma.room.findMany({
      where: {
        id: request.params.roomID,
        hotelID: request.params.hotelID,
      },
      select: {
        amenities: true,
      },
    });
    response.json(hotelRooms[0]);
  }
}

module.exports = HotelController;
