import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
// import Mail from "nodemailer/lib/mailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER, // Your Mailtrap or SMTP username
    pass: process.env.MAIL_PASS, // Your Mailtrap or SMTP password
  },
} as SMTPTransport.Options);

type SendEmailDto = {
    from:Mail.Address;
    to:Mail.Address[];
    subject:string;
    text:string;

}

// Wrap in an async IIFE so we can use await.
export const sendEmail = async (dto:SendEmailDto) => {
  const { from, to, subject, text } = dto;
  const info = await transporter.sendMail({
    from: from, // sender address
    to: to,// list of receivers
    subject: subject,
    text: text, // plain‑text body
    // html: "<b>Hello world? html</b>",
  });
  console.log("Message sent:", info.messageId);
  return info;
};
