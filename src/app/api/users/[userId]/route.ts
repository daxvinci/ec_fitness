import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model/User";


export async function DELETE(request: NextRequest,{params}:{params:{userId:string}}) {
  await dbConnect();

  const id = params.userId
  try {
    const users = await User.findByIdAndDelete(id);
    if (!users) {
      return NextResponse.json({ message: "Users not found" }, { status: 200 });
    }
    console.log(users);
    return NextResponse.json(
      { message: "Users deleted successfully", success: true, users },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error check logs" });
  }
}

export async function PATCH(req: NextRequest,{ params }: { params: { userId: string } }) {
  await dbConnect();

  const id = params.userId;
  const {startDate,endDate} = await req.json();

  try {
    const users = await User.findByIdAndUpdate(id, {startDate,endDate},{new:true});
    if (!users) {
      return NextResponse.json({ message: "Users not found" }, { status: 200 });
    }
    return NextResponse.json(
      { message: "Users retrieved", success: true, users },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error check logs" });
  }
}