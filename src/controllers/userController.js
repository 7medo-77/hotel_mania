const { PrismaClient } = require('@prisma/client');
const passwordHash = require('../utils/hashPasswordHelper');

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class UserController {
  // SALT_ROUNDS = 5

  // constructor() {
  //   this.SALT_ROUNDS = 5;
  // }

  static async addCurrentValidatedUser(request, response) {
    const {
      firstname: firstName,
      email,
      lastname: lastName,
      password: plainPassword,
    } = request.body;
    const hashedPassword = await passwordHash(plainPassword, this.SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    response.send(newUser);
  }

  static async getHotelRooms(request, response) {
    const hotelRooms = await prisma.room.findMany({
      where: {
        hotelID: request.params.hotelID,
        isReserved: false,
      },
    });
    response.json(hotelRooms[0]);
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

module.exports = UserController;
