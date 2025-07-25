
import { sendEmail } from "@/app/lib/utils/mail.utils";
import {  NextResponse } from "next/server";

export async function POST() {

  const sender = {
    name: "Trappy Trap",
    address:"noreply@examplify.com",
  }
  const recipient = [{
    name: "receiver",
    address:"ebukaokoro40@gmail.com",
  },{
    name: "receiver2",
    address:"vinci@gmail.com"
  }]

  try {
    const result = await sendEmail({
      from: sender,
        to: recipient,
        subject: "Hello ✔",
        text: "Hello Elvis.....Good to see you",
    });
    return NextResponse.json({
        message: "Email sent successfully",
        info: result,
        });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json({
        message: "Failed to send email",
        error: err instanceof Error ? err.message : "Unknown error",
    }, { status: 500 });
  }
}
