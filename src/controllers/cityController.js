const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class cityController {
  static async getAllCities(request, response) {
    const allCities = await prisma.city.findMany();

    response.json(allCities);
  }

  static async getAllHotelsOfCity(request, response) {
    const allHotelsCity = prisma.city.findMany({
      where: {
        cityID: request.params.cityID,
      },
      select: {
        hotels: true,
      },
    });
    response.json(allHotelsCity[0]);
  }
}

module.exports = cityController;
