import nodemailer from "nodemailer";

export default async function sendEmail(req, res) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    let transporter = nodemailer.createTransport({
      host: "node122-eu.n0c.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: subject,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
        return res.status(500).json({
          message: "Erreur lors de l'envoi de l'email",
          error: error.message,
        });
      }
      return res.status(200).json({ message: "Email envoyé avec succès" });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
