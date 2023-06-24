import nodemailer from "nodemailer";

const email = "ebiwari@gmail.com";

const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: email,
    pass: "Ayebalayefa@1",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export const main = async (to, code) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"FUO Votting 👻" <${email}>'`, // sender address
    to: to, // list of receivers
    subject: "Validation Code FUO", // Subject line
    text: "Hello ", // plain text body
    html: `<b>Validation-Code:${code}</b>`, // html body
  });
};
