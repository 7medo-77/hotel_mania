require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { hashPassword, checkPassword } = require('./src/utils/hashPasswordHelper');

const prisma = new PrismaClient();

const userEmail = 'Jibril_Emad_6@yahoo.com';
const password = 'Jibril_Emad_6@yahoo.com';

async function main() {
  const userResult = await prisma.user.findMany();

  console.log(userResult.map((user) => user.email));
  // const { password } = request.body;
}

main();
