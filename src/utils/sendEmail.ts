import nodemailer from "nodemailer";

import {
  MAIL_USERNAME,
  SMTP_HOST,
  SMTP_PORT,
  MAIL_PASSWORD,
} from "../constants";

export const sendEmail = async (email: string, url: string) => {
  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Fred Foo 👻" ${MAIL_USERNAME}`, // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `Hello world? ${url}`, // plain text body
    html: `<b>Hello world?</b><br><a href="${url}">confirm email</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
