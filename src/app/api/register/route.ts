import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { firstName, lastName, email, number, password } = body;
  const saltRounds = 10;
 

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email." },
        { status: 409 }
      );
    }
    
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = await User.create({ firstName, lastName, email, number, password:hashedPassword});

    const token = jwt.sign(
      { userId: user.id, email: user.email, firstName:user.firstName },
      process.env.JWT_SECRET!,              
      { expiresIn: "1d" }                    
    );
    return NextResponse.json({ success: true, token, user }, { status: 200 });
  } catch (err) {
    console.log("error: " + err);
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}
