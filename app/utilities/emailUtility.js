import nodemailer from "nodemailer";

const sendEmail = async (EmailTo, EmailText, EmailSubject) => {
  let transporter = nodemailer.createTransport({
    //smtp server configuration
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: process.env.EMAIL_UN_AUTHORIZED,
    },
  });
  let mailOptions = {
    from: '"Super Mahmoud 👻" <lewiswilliam4201@gmail.com>',
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };
  return await transporter.sendMail(mailOptions);
};
export default sendEmail;
