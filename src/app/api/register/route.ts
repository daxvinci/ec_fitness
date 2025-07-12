import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { firstName, lastName, email, date, number } = body;

  const user = await User.create({ firstName, lastName, email, date, number });

  return NextResponse.json(user);
}
