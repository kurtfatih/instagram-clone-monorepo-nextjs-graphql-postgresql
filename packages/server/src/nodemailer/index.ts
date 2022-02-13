import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"
export const initNodeMailer = async () => {
  return await nodemailer.createTestAccount()
}

export const sendMailToUser = async (mailOptions: Mail.Options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "oliver.gaylord64@ethereal.email",
      pass: "6cANQWyZf4xJCH7151"
    }
  })
  // example of send mail
  // let info = await transporter.sendMail({
  //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
  //   to: "bar@example.com, baz@example.com", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>" // html body
  // })

  const info = await transporter.sendMail(mailOptions)

  return info
}
