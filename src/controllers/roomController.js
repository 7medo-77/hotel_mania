const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class RoomController {
  static async getAllRooms(request, response) {
    // console.log(request.query);
    const params = request.query;
    let { offset, limit } = params;
    offset = offset || 0;
    limit = limit || 10;
    console.log(offset, limit);

    try {
      if (Object.entries(request.query).length > 0) {
        if (request.query.city) {
          const city = decodeURIComponent(request.query.city).toString();
          console.log("getAllRooms controller: ", params, offset, limit);

          const cityId = await prisma.city.findUnique({
            where: {
              name: city,
            },
            select: {
              id: true,
            },
          });

          const cityRoomsArray = await prisma.room.findMany({
            skip: offset,
            take: limit,
            where: {
              hotel: {
                city: {
                  // name: request.query.city,
                  name: city,
                },
              },
              isReserved: false,
            },
            include: {
              amenities: true,
            },
          });
          console.log(cityId, cityRoomsArray);

          if (cityRoomsArray.length === 0) {
            response.status(404).json({ Error: "Not Found" });
          } else {
            offset += 1;

            response.json({
              status: 200,
              message: `Hotels for ${city}`,
              data: { cityId, rooms: cityRoomsArray, offset, limit },
            });
          }
        } else if (request.query.governate) {
          const { governate: encodedGov } = request.query;
          const governate = decodeURIComponent(encodedGov);

          const cityId = await prisma.governate.findUnique({
            where: {
              name: governate,
            },
            select: {
              id: true,
            },
          });

          const governateRoomsArray = await prisma.room.findMany({
            skip: offset,
            take: limit,
            where: {
              hotel: {
                city: {
                  governate: {
                    name: governate,
                  },
                },
              },
              isReserved: false,
            },
            include: {
              amenities: true,
            },
          });

          if (governateRoomsArray.length === 0) {
            response.status(404).json({ Error: "Not Found" });
          } else {
            offset += 1;

            response.json({
              status: 200,
              message: `Hotels for ${governate}`,
              data: { cityId, rooms: governateRoomsArray, offset, limit },
            });
          }
        }
      } else {
        const allRooms = await prisma.room.findMany({
          skip: offset,
          take: limit,
          include: {
            amenities: true,
          },
        });
        if (allRooms.length === 0) {
          response.status(500).json({ Error: "Server Error" });
        } else {
          offset += 1;
          // response.json(allRooms);
          response.json({
            status: 200,
            message: "All rooms",
            data: { rooms: allRooms, offset, limit },
          });
        }
        // response.send('Under construction');
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
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
    const roomAmenities = await prisma.amenity.findMany({
      where: {
        rooms: {
          some: {
            id: request.params.roomID,
          },
        },
      },
    });
    response.json(roomAmenities);

    // const roomAmenities = await prisma.room.findMany({
    //   where: {
    //     id: request.params.roomID,
    //   },
    //   select: {
    //     amenities: {
    //       select: {
    //         id: true,
    //         iconURL: true,
    //         name: true,
    //       },
    //     },
    //   },
    // });

    // response.json(roomAmenities[0]);
  }
}

module.exports = RoomController;
