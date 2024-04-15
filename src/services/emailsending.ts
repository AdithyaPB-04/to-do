import nodemailer from "nodemailer";

export async function sendmail(
  emails: string,
  subject: string,
  text: string,
//   htmlContent: string,
//   id: number
) {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "",
        pass: "",
      },
    });

    let mailDetails = {
      from: "process.env.MAIL_ID",
      to: emails,
      subject: subject,
      text: text,
    };
    await mailTransporter.sendMail(mailDetails);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error Occurs", error);
  }
}
