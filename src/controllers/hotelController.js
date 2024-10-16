const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class HotelController {
  static async getAllHotels(request, response) {
    if (Object.entries(request.query).length > 0) {
      if (request.query.city) {
        const cityHotelsArray = await prisma.hotel.findMany({
          where: {
            city: {
              name: request.query.city,
            },
          },
          include: {
            rooms: true,
          },
        });
        response.json(cityHotelsArray);
      } else if (request.query.governate) {
        const governateHotelsArray = await prisma.hotel.findMany({
          where: {
            city: {
              governate: {
                name: request.query.governate,
              },
            },
          },
          include: {
            rooms: true,
          },
        });
        response.json(governateHotelsArray);
      }
    } else {
      const allHotels = await prisma.hotel.findMany();
      response.json(allHotels);
    }
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
