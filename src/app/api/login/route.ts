import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model/User";
import { UserDetails } from "@/app/lib/types";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { email, password } = body;

  try {
    const user = await User.findOne<UserDetails>({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 200 });
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 200 }
      );
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email, firstName:user.firstName },
      process.env.JWT_SECRET!,              
      { expiresIn: "1d" }                    
    );
    return NextResponse.json(
      { message: "Login successful", success: true, token, user },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error check logs" }, { status: 500 });
  }
}
