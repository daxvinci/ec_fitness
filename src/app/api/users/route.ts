import { NextResponse } from "next/server";
// import dbConnect from "@/app/lib/dbConnect";
// import User from "@/app/lib/model/User";

export async function GET() {
  // await dbConnect();

  // const users = await User.find();
  return NextResponse.json({
    "users":"just you brodie"
  });
}
