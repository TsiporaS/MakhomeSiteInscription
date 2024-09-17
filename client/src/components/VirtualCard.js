import React, { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'; // Import du composant pour générer le QR code
import html2canvas from 'html2canvas'; // Assurez-vous d'avoir installé html2canvas
import logo from './logo-rond-makhome.png'; // Importe ton logo
import '../css/VirtualCard.css';


export default function VirtualCard() {
  const { barcodeValue } = useParams(); // Utilisation de useParams pour obtenir la valeur
  const cardRef = useRef(null);
  const location = useLocation();
  const { studentFirstName, studentLastName, studentEmail } = location.state || {};

  // Fonction pour capturer la carte virtuelle sous forme d'image
  const handleCapture = async () => {
    const canvas = await html2canvas(cardRef.current);
    const imgData = canvas.toDataURL("image/png");

    // Crée un lien de téléchargement
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `virtual_card_${studentFirstName}_${studentLastName}.png`;

    // Déclenche le téléchargement
    link.click();
  };

  // Fonction pour envoyer l'image par mail
  const handleSendByEmail = async () => {
    const canvas = await html2canvas(cardRef.current);
    const imgData = canvas.toDataURL("image/png");

    // Appeler la fonction pour envoyer l'image par mail
    sendImageByEmail(imgData);
  };

  // Fonction pour envoyer l'image au serveur
  const sendImageByEmail = async (imgData) => {
    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imgData,
          firstName: studentFirstName,
          lastName: studentLastName,
          email: studentEmail // Remplace par l'email destinataire
        }),
      });

      if (response.ok) {
        alert("L'image a été envoyée par email avec succès !");
      } else {
        alert("Une erreur est survenue lors de l'envoi de l'email.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
    }
  };

  return (
    <div>
      <div ref={cardRef} style={{ 
        width: '300px', 
        height: '400px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        textAlign: 'center', 
        backgroundColor: '#f5f5f5' 
      }}>
        {/* Logo de l'association */}
        <img src={logo} alt="Logo de l'association" style={{ width: '100px', marginBottom: '20px' }} />

        {/* Nom de l'étudiant */}
        <h2>{studentFirstName} {studentLastName}</h2>

        {/* Espace pour le QR code */}
        <QRCodeCanvas value={barcodeValue} size={128} /> {/* Génère le QR code */}

      </div>

      <button onClick={handleCapture}>Télécharger la carte virtuelle</button>
      <button onClick={handleSendByEmail}>Envoyer par email</button>
    </div>
  );
}









//Pour le code barre

// import React, { useEffect, useRef } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import JsBarcode from 'jsbarcode';
// import html2canvas from 'html2canvas'; // Assurez-vous d'avoir installé html2canvas
// import logo from './logo-rond-makhome.png'; // Importe ton logo

// export default function VirtualCard() {
//   const { barcodeValue } = useParams();
//   const cardRef = useRef(null);
//   const barcodeRef = useRef(null);
//   const location = useLocation();
//   const { studentFirstName, studentLastName } = location.state || {};

//   useEffect(() => {
//     if (barcodeRef.current) {
//       JsBarcode(barcodeRef.current, barcodeValue, {
//         format: "CODE128",
//         lineColor: "#000",
//         width: 2,
//         height: 50,
//         displayValue: false,
//       });
//     }
//   }, [barcodeValue]);

//   // Fonction pour capturer la carte virtuelle sous forme d'image
//   const handleCapture = async () => {
//     const canvas = await html2canvas(cardRef.current);
//     const imgData = canvas.toDataURL("image/png");

//     // Crée un lien de téléchargement
//     const link = document.createElement('a');
//     link.href = imgData;
//     link.download = `virtual_card_${studentFirstName}_${studentLastName}.png`;

//     // Déclenche le téléchargement
//     link.click();
//   };

//   // Fonction pour envoyer l'image par mail
//   const handleSendByEmail = async () => {
//     const canvas = await html2canvas(cardRef.current);
//     const imgData = canvas.toDataURL("image/png");

//     // Appeler la fonction pour envoyer l'image par mail
//     sendImageByEmail(imgData);
//   };

//   // Fonction pour envoyer l'image au serveur
//   const sendImageByEmail = async (imgData) => {
//     try {
//       const response = await fetch("/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           image: imgData,
//           studentFirstName,
//           studentLastName,
//           email: "adresse@email.com" // Remplace par l'email destinataire
//         }),
//       });

//       if (response.ok) {
//         alert("L'image a été envoyée par email avec succès !");
//       } else {
//         alert("Une erreur est survenue lors de l'envoi de l'email.");
//       }
//     } catch (error) {
//       console.error("Erreur lors de l'envoi de l'email:", error);
//     }
//   };

//   return (
//     <div>
//       <div ref={cardRef} style={{ 
//         width: '300px', 
//         height: '400px', 
//         padding: '20px', 
//         border: '1px solid #ddd', 
//         textAlign: 'center', 
//         backgroundColor: '#f5f5f5' 
//       }}>
//         {/* Logo de l'association */}
//         <img src={logo} alt="Logo de l'association" style={{ width: '100px', marginBottom: '20px' }} />

//         {/* Nom de l'étudiant */}
//         <h2>{studentFirstName} {studentLastName}</h2>

//         {/* Espace pour le code-barres */}
//         <svg ref={barcodeRef}></svg>
//       </div>

//       <button onClick={handleCapture}>Télécharger la carte virtuelle</button>
//       <button onClick={handleSendByEmail}>Envoyer par email</button>
//     </div>
//   );
// }
