import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model/User";
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { firstName, lastName, email, number, password } = body;
  const saltRounds = 10;
 

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = await User.create({ firstName, lastName, email, number, hashedPassword});
    console.log(user);
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (err) {
    console.log("error: " + err);
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}
