
import { transporter } from "@/app/lib/utils/mail.utils";
import {   NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
  
  const body = await request.json();
  const message = {
    from: `EC-Fitness <${process.env.GOOGLE_EMAIL}>`,
    to: `${body.email} ebukaokoro40@yahoo.com`,
    subject: "Welcome to EC Fitness – Where Strength Meets Aesthetic",
    html: `<h1><b className="text-5xl">Hi ${body.name},</b><h1/>
    <h2 className="text-3xl">Welcome to EC Fitness — Enugu’s most elite and aesthetic gym. 💪🏽✨<h2/>
    <br/>
    <h3>
      We’re thrilled to have you on board and can’t wait to walk with you on your fitness journey. Whether you’re here to gain strength, stay active, or just feel better — we’ve got your back.
      <br/>

      Expect top-tier equipment, motivating programs, and a supportive community to keep you going.
      <br/>
      <br/>
      📍 Opening Hours:
      <br />
      Monday – Saturday | 7:30 AM – 8:00 PM
      <br />
      <br />
      Let’s connect online too!
      <br />
      📸 Follow us on Instagram: <a href='https://www.instagram.com/' className='text-blue-500'>@ec_fitnessng</a>
      <br />
      (Stay updated with new programs, transformation stories & more.)
      <br />
      <br />
      See you at the gym!
      <br />
     <i> — The EC Fitness Team 🖤</i>
      </h3>`,
    headers: {
      "X-Entity-Ref-ID": "newmmail",
    },
  };

  try {
    const result = await transporter.sendMail(message);
    return NextResponse.json({
        message: "Email sent successfully",
        info: result,
        status: 200,
        });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json({
        message: "Failed to send email",
        error: err instanceof Error ? err.message : "Unknown error",
    }, { status: 500 });
  }
}
