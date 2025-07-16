import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model/User";
import { UserDetails } from "@/app/lib/types";
import jwt from "jsonwebtoken";


export async function GET(request: NextRequest) {
  await dbConnect();
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET!);

    const users = await User.find<UserDetails>();
    if (!users) {
      return NextResponse.json({ message: "Users not found" }, { status: 200 });
    }
    return NextResponse.json(
      { message: "Users retrieved", success: true, users },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error check logs" },{ status: 500 });
  }
}
