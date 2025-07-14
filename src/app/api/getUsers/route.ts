import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model/User";
import { UserDetails } from "@/app/lib/types";


export async function GET() {
  await dbConnect();

  try {
    const users = await User.find<UserDetails>();
    if (!users) {
      return NextResponse.json({ message: "Users not found" }, { status: 200 });
    }
    console.log(users)
    return NextResponse.json(
      { message: "Users retrieved", success: true, users },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error check logs" });
  }
}
