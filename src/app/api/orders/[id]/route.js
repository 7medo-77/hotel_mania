/* Orders api handlers */

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function GET(request, { params }) {
	const { id } = params;
	const user_id = parseInt(id, 10);
	const session = await auth();
	  if (session?.user?.id === user_id) {
	  try {
		const result = await sql`SELECT * FROM orders WHERE user_id = ${id}`;
		const orders = result.rows;
		return NextResponse.json({ orders }, { status: 200 });
	  } catch (error) {
		  return NextResponse.json({ error }, { status: 500 });
	  }
	} else {
	  return NextResponse.json("Not available");
	}
  }

export async function POST(request) {
  const session = await auth();
  const data = await request.json()
  const { userId, deliveryAddress, cart, paid } = data;
  if (session?.user?.id === userId) {
  try {
	  const json = JSON.stringify(cart);
	  const orderDate = new Date();
	  await sql`INSERT INTO orders (user_id , json, order_date, delivery_address, paid) VALUES (${userId}, ${json}, ${orderDate}, ${deliveryAddress}, ${paid});`;
	  return NextResponse.json("Order was saved");
  } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
	}
  } else {
	return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
	const { id } = params;
	const session = await auth();
	  if (session?.user?.admin) {
	  try {
		  await sql`DELETE FROM orders WHERE id = ${id};`;
		  return NextResponse.json("Order delelted");
	  } catch (error) {
		  return NextResponse.json({ error }, { status: 500 });
	  }
	} else {
	  return NextResponse.json({ error }, { status: 500 });
	}
  }