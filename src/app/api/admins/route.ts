import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import jwt from "jsonwebtoken";


export async function GET(request: NextRequest) {
  await dbConnect();
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Type guard to ensure decoded is an object and has the expected fields
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "firstName" in decoded &&
      "email" in decoded &&
      "admin" in decoded &&
      decoded.admin === true
    ) {
      // Now you can safely return decoded
      return NextResponse.json(
        { message: "Admin info", success: true, admin: decoded },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Forbidden: Admins only" },
        { status: 403 }
      );
    }
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized",error:err }, { status: 500 });
  }
}
