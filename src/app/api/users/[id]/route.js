/* Users api handlers */

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function DELETE(request, { params }) {
	const { id } = params;
	const session = await auth();
	  if (session?.user?.admin) {
	  try {
		  await sql`DELETE FROM users WHERE id = ${id};`;
		  return NextResponse.json("User delelted");
	  } catch (error) {
		  return NextResponse.json({ error }, { status: 500 });
	  }
	} else {
	  return NextResponse.json({ error }, { status: 500 });
	}
  }
