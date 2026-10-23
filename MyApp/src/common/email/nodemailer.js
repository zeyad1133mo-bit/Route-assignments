// create transporter

import { config } from "dotenv";
import nodemailer from "nodemailer";

config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    //service: 'gmail',
      auth:{
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
      }
  
  });

export async function sendMail(to,subject,html){

await transporter.sendMail({
    from:`"MYAPP"<${process.env.MAIL_USER}>`,
    to: to,
    subject: subject,
    html: html
})
}