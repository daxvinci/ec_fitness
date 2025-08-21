import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model/User";
import jwt, { JwtPayload } from "jsonwebtoken"

export async function GET(request: NextRequest) {
  await dbConnect();

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    let userId: string | undefined;
    if (typeof decoded === "object" && decoded !== null && "userId" in decoded) {
      userId = (decoded as JwtPayload).userId as string;
    } else {
      // handle error: invalid token payload 
      return NextResponse.json({ message: "Invalid token payload" }, { status: 401 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    // console.log(user);
    return NextResponse.json(
      { message: "Users retrieved", success: true, user },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error check logs" },{status:500});
  }
}

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await dbConnect();
//   const id = params.id;

//   try {
//     const deletedUser = await User.findByIdAndDelete(id); // would be replaced by Id

//     if (!deletedUser) {
//       return NextResponse.json({ message: "User not found" }, { status: 200 });
//     }
//     console.log(deletedUser);
//     return NextResponse.json(
//       { message: "Users retrieved", success: true, deletedUser },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json({ message: "error deleting user check logs" });
//   }
// }

// export async function PATCH(req: NextRequest,{ params }: { params: { id: string } }) {
//   await dbConnect();

//   const id = params.id;
//   const startDate = await req.json();

//   try {
//     const users = await User.findByIdAndUpdate(id, {startDate},{new:true});
//     if (!users) {
//       return NextResponse.json({ message: "Users not found" }, { status: 200 });
//     }
//     return NextResponse.json(
//       { message: "Users retrieved", success: true, users },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json({ message: "error check logs" });
//   }
// }
