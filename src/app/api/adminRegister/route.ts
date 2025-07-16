import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Admin from "@/app/lib/model/Admin";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { name, email, firstName,lastName, password } = body;
  const saltRounds = 10;

  try{

          const hashedPassword = await bcrypt.hash(password, saltRounds)
          const admin = await Admin.create({ name, email, firstName,lastName, password:hashedPassword });
          if(!admin){
            return NextResponse.json({ message: "User not found" }, { status: 200 });
          }
          const token = jwt.sign(
            { userId: admin.id, email: admin.email, firstName:admin.firstName,role:"admin" },
            process.env.JWT_SECRET!,              
            { expiresIn: "1d" }                    
          );
          console.log(admin)
          return NextResponse.json({ success: true, token, user:admin }, { status: 200 });

  }catch(err){
    console.log("error: " + err)
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }


}
