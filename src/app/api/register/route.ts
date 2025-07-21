import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { name, email, number, password,subscription,trainer,startDate,endDate } = body;
  const saltRounds = 10;
 

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email." },
        { status: 409 }
      );
    }

    if (!name || !email || !number || !subscription || !startDate || !endDate || !password) {
      return NextResponse.json({ success: false, message: "All fields are required." },{status:400});
    }
    
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = await User.create({ name, email, number, password:hashedPassword,subscription,trainer,startDate,endDate});

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
