const { Router } = require("express");
const app = Router();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const multer = require('multer');

// app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '50mb' })); // Augmente la limite à 10 MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const upload = multer(); // Middleware pour traiter les fichiers dans le formulaire

// app.post("/send-email", upload.single('image'), (req, res) => {
app.post("/send-email", (req, res) => {
  const [ image, firstName, lastName, email ] = req.body;

  // Vérifiez le format de l'image
  console.log("Image Data URL:", image);

  // Configurer Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fidelitemakhome@gmail.com', // Votre email
      pass: 'ikkp tetn ykax asgy', // Votre mot de passe
    },
  });

  const mailOptions = {
    from: 'fidelitemakhome@gmail.com',
    to: email,
    subject: `Carte virtuelle pour ${firstName} ${lastName}`,
    // html: `<p>Voici la carte virtuelle de ${firstName} ${lastName}.</p><img src="${image}" alt="Carte virtuelle"/>`,
    html: `<p>Voici la carte virtuelle de ${firstName} ${lastName}.</p>`,
    attachments: [
      {
        filename: `virtual_card_${firstName}_${lastName}.png`,
        content: image.split('base64,')[1], // Extrait la partie base64 de la Data URL
        encoding: 'base64'
      }
    ]
  };

  // Envoyer l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return res.status(500).json({message: "Erreur lors de l'envoi de l'email"});
    } else {
      console.log("Email envoyé: " + info.response);
      return res.status(200).json({message:"Email envoyé avec succès"});
    }
  });

});

module.exports = app;
