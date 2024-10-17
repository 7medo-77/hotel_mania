'use server';

import { sql } from "@vercel/postgres";
import { signIn } from "../../auth";
import { signOut } from "../../auth";
import { redirect } from "next/navigation";
const bcrypt = require('bcrypt');


/* AUTHENTICATION FUNCTIONS */
export async function register(previousState, formData) {
  const { userName, email, phoneNumber, address, passWord, rePassWord, firstName, lastName } = Object.fromEntries(formData);
  if (!userName || !email || !phoneNumber || !passWord || !rePassWord || !address || !firstName || !lastName) {
	  return {error: "Please fill in all data"};
  }
  const nonAlpha = /^[A-Za-z0-9_]+$/;
  if (!nonAlpha.test(userName)) {
    return {error: "User name should contain only alphanumeric characters and underscores"};
  }
  const eightAtLeast = /^[A-Za-z0-9_]{8,}$/;
  if (!eightAtLeast.test(userName)) {
    return {error: "User-name should contain at least 8 characters"};
  }
  const user = await sql`SELECT * FROM users WHERE username = ${userName};`;
  if (user.rowCount !== 0) {
    return {error: "User-name is already used"};
  }
  const validEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  if (!validEmail.test(email)) {
    return {error: "Please enter a valid e-mail adress"};
  }
  const userEmail = await sql`SELECT * FROM users WHERE email = ${email};`;
  if (userEmail.rowCount !== 0) {
    return {error: "E-mail is already used"};
  }
  const phoneNum = /^[0-9]{11}$/;
  if (!phoneNum.test(phoneNumber)) {
    return {error: "Phone number should contain eleven numbers"};
  }
  const userPhoneNumber = await sql`SELECT * FROM users WHERE phone_number = ${phoneNumber};`;
  if (userPhoneNumber.rowCount !== 0) {
    return {error: "Phone number is already used"};
  }
  const alpha = /^[A-Za-z]+$/;
  if (!alpha.test(firstName)) {
    return {error: "First name should contain only alphabetic characters"};
  }
  if (!alpha.test(lastName)) {
    return {error: "Last name should contain only alphabetic characters"};
  }
  if (!address) {
    return {error: "Please type your address"}
  }
  const validPassWord = /^[A-Za-z0-9_\-@%#*]+$/;
  if (!validPassWord.test(passWord)) {
    return {error: "Password should contain only alphanumeric and special characters @ % * - _ #"};
  }
  const validPassWordLength = /^[A-Za-z0-9_\-@%#*]{8,32}$/;
  if (!validPassWordLength.test(passWord)) {
    return {error: "Password should be 8 to 32 characters"};
  }
  if (passWord !== rePassWord) {
	  return {error: "Passwords do not match"};
  }
  const salt = await bcrypt.genSalt(10);
  const pwHash = await bcrypt.hash(passWord, salt);
  try {
	await sql`INSERT INTO users (username , password , email, address, first_name, last_name, phone_number) VALUES (${userName}, ${pwHash}, ${email}, ${address}, ${firstName}, ${lastName}, ${phoneNumber});`;
  } catch (error) {
	return {error: "Sorry, something went "};
  }
  redirect('/login');
};

export async function logIn(previousState, formData) {
  const { email, password } = Object.fromEntries(formData);
  if (!email || !password) {
	  return {error: "Both e-mail and password are required"};
  }
  try {
    await signIn("credentials", { email, password });
  } catch (err) {
    if (err.type === "CallbackRouteError") {
      return { error: "Something went wrong, please re-check email or user name and password" };
    }
  }
  redirect('/');
}

export async function logOut(previousState, formData) {
  await signOut();
};

/* USER FUNCTIONS */

export async function getUserFromDb(email, password) {
  let user = await sql`SELECT * FROM users WHERE email = ${email};`
  if (user.rowCount !== 1) {
    user = await sql`SELECT * FROM users WHERE username = ${email};`
  }
  if (user.rowCount !== 1) {
    console.log(user.rowCount);
    throw new Error("User not found.");
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.rows[0].password
  );

  if (!isPasswordCorrect) throw new Error("Wrong credentials!");
  return user.rows[0];
};

export async function getUser(email) {
  const user = await sql`SELECT * FROM users WHERE email = ${email};`
  return user.rows[0];
};

export async function updatePhoneNumber (previousState, formData) {
  const { id, phoneNumber } = Object.fromEntries(formData);
  if (!phoneNumber) {
    return {error: "Please enter the desired phone number"}
  }
  const phoneNum = /^[0-9]{11}$/;
  if (!phoneNum.test(phoneNumber)) {
    return {error: "Phone number should contain eleven numbers"};
  }
  const userPhoneNumber = await sql`SELECT * FROM users WHERE phone_number = ${phoneNumber};`;
  if (userPhoneNumber.rowCount !== 0) {
    return {error: "Phone number is already used"};
  }
  try {
  await sql`UPDATE users SET phone_number = ${phoneNumber} WHERE id = ${id};`;
  } catch (error) {
	return {error: "Sorry, something went "};
  }
  return {success: "Successfully updated"}
}

export async function updateAddress (previousState, formData) {
  const { id, address } = Object.fromEntries(formData);
  if (!address) {
    return {error: "Please enter the desired address"}
  }
  try {
  await sql`UPDATE users SET address = ${address} WHERE id = ${id};`;
  } catch (error) {
	return {error: "Sorry, something went "};
  }
  return {success: "Successfully updated"}
}

/* ORDER FUNCTIONS */

export async function orderPayment(id, paid) {
  await sql`UPDATE orders SET paid = ${paid} WHERE id = ${id};`;
}

export async function orderDelivery(id, delivered) {
  await sql`UPDATE orders SET delivered = ${delivered}  WHERE id = ${id};`;
}

/* Menu Functions */

export async function getMenu() {
  const menu = await sql`SELECT * FROM menu;`;
  return menu.rows;
}
