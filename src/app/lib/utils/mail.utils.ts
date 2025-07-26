
import nodemailer from "nodemailer";
// import SMTPTransport from "nodemailer/lib/smtp-transport";
// import Mail from "nodemailer/lib/mailer";



// Create a test account or replace with real credentials.
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_EMAIL, // Your Mailtrap or SMTP username
    pass: process.env.GOOGLE_APP_PASS, // Your Mailtrap or SMTP password
  },
  tls: {
    //do not fail on invalid certs
    rejectUnauthorized: false,
  },
});


