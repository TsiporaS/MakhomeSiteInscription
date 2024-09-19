import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'; // Import du composant pour générer le QR code
import html2canvas from 'html2canvas'; // Assurez-vous d'avoir installé html2canvas
import logo from './logo-rond-makhome.png'; // Importe ton logo
import '../css/VirtualCard.css';
import { convertFormDataToArray, GoToServer } from '../fetch';


export default function VirtualCard() {
  const { barcodeValue } = useParams(); // Utilisation de useParams pour obtenir la valeur
  const cardRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
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
    // const canvas = await html2canvas(cardRef.current, { scale: 0.5 });
    const canvas = await html2canvas(cardRef.current);
    const imgData = canvas.toDataURL("image/png"); 

    console.log("Image Data URL:", imgData);

    // Appeler la fonction pour envoyer l'image par mail
    sendImageByEmail(imgData);
  };

  // Fonction pour envoyer l'image au serveur
  const sendImageByEmail = async (imgData) => {
    // try {

    //   const blob = await (await fetch(imgData)).blob(); // Convertir en Blob
    //   const formData = new FormData();
    //   formData.append('image', blob, 'virtual_card.png'); // Ajouter l'image sous forme de fichier


    //   const query = "/send-email";
    //   const myData = {
    //     image: imgData,
    //     firstName: studentFirstName,
    //     lastName: studentLastName,
    //     email: studentEmail // Remplace par l'email destinataire
    //   }

    //   const parameters = convertFormDataToArray(myData);

    //   console.log("parameters mail", parameters);


    //   const response = await GoToServer(query, "POST", parameters);

    //   if (response.status === 200) {
    //     const message = await response.message; // Attendre une réponse texte
    //     alert(message); // Afficher l'alerte avec le message du serveur
    //     // alert("L'image a été envoyée par email avec succès !");
    //   } else {
    //     alert("Une erreur est survenue lors de l'envoi de l'email.");
    //   }

    // } catch (error) {
    //   console.error("Erreur lors de l'envoi de l'email:", error);
    // }

    const query = "/send-email";
    const myData = {
      image: imgData,
      firstName: studentFirstName,
      lastName: studentLastName,
      email: studentEmail // Remplace par l'email destinataire
    }

    const parameters = convertFormDataToArray(myData);


  await GoToServer(query, "POST", parameters)
  .then((response) => {
    alert("L'image a été envoyée par email avec succès !");
  })
  .catch((error) => {
    console.error("Erreur lors de l'envoi de l'email:", error);
  });
};

  // Fonction pour retourner à la page précédente
  const backToHome = () => {
    navigate("/manager/home");
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
      <button onClick={backToHome}>Retour à la page d'accueil</button>
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
