import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Admin from "@/app/lib/model/Admin";
import bcrypt from "bcrypt"
import { AdminDetails } from "@/app/lib/types";
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { email, password} = body;

  try{

    const admin = await Admin.findOne<AdminDetails>({ email});
    if(!admin){
      return NextResponse.json({ message: "User not found" }, { status: 200 });
    }
    const token = jwt.sign(
      { userId: admin.id, email: admin.email, firstName:admin.firstName,admin:true },
      process.env.JWT_SECRET!,              
      { expiresIn: "1d" }                    
    );
    const correctPassword = await bcrypt.compare(password, admin.password);
    if (!correctPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", success: true, token, user:admin },
      { status: 200 }
    );

  }catch(err){
    console.log(err)
    return NextResponse.json({ message: "error check logs" });
  }

}
