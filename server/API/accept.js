const { Router } = require("express");
const app = Router();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

app.use(bodyParser.json());


app.post("/send-email", (req, res) => {
  const { image, firstName, lastName, email } = req.body;

  // Configurer Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fidelitemakhome@gmail.com', // Votre email
      pass: 'Makhome26!', // Votre mot de passe
    },
  });

  const mailOptions = {
    from: 'fidelitemakhome@gmail.com',
    to: email,
    subject: `Carte virtuelle pour ${firstName} ${lastName}`,
    html: `<p>Voici la carte virtuelle de ${firstName} ${lastName}.</p><img src="${image}" alt="Carte virtuelle"/>`,
  };

  // Envoyer l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return res.status(500).send("Erreur lors de l'envoi de l'email");
    } else {
      console.log("Email envoyé: " + info.response);
      return res.status(200).send("Email envoyé avec succès");
    }
  });
});

module.exports = app;
