import dbConnect from "@/app/lib/dbConnect";
import Count from "@/app/lib/model/Count";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { type } = body;

  const today = new Date().toDateString();

  let stats = await Count.findOne({ date: today });
  if (!stats) {
    stats = await Count.create({ date: today, total: 0, current: 0 });
  }

  if (type === "in") {
    stats.total += 1;
    stats.current += 1;
  } else if (type === "out" && stats.current > 0) {
    stats.current -= 1;
  }

  await stats.save();
  return NextResponse.json(stats);
}

export async function GET() {
  await dbConnect();

  const today = new Date().toDateString();
  let stats = await Count.findOne({ date: today });

  if (!stats) {
    stats = await Count.create({ date: today, total: 0, current: 0 });
  }

  return NextResponse.json(stats);
}