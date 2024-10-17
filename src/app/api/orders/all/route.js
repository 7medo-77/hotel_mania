/* Orders api handlers */

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";


export async function GET(request) {
  const session = await auth();
	if (session?.user?.admin) {
	try {
		const result = await sql`SELECT * FROM orders;`;
		const orders = result.rows;
		return NextResponse.json({ orders }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
  } else {
	return NextResponse.json({ error }, { status: 500 });
  }
}
