// import React, { useState } from 'react';
// import { QrReader } from 'react-qr-reader';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../css/QRCodeScanner.css';
// import { GoToServer3 } from '../fetch';

// export default function QRCodeScanner() {
//   const [result, setResult] = useState(null);
//   const [student, setStudent] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isCameraActive, setIsCameraActive] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { reason } = location.state || {};

//   const handleScan = async (data) => {
//     if (data?.text && !scanned && !loading && data.text !== result) {

//       console.log("data", data);
//       console.log("result", result );
//       console.log("isCameraActive1", isCameraActive);
//       console.log("reason", reason);
//       console.log("result", result);
//       // console.log("result.text", result.text);


//       // setScanned(true);
//       // setLoading(true);
//       // setIsCameraActive(false);
//       const currentResult = data.text;
//       // setResult(currentResult);

//       try {
//         const query = `/api/student/${currentResult}`;
//         const response = await GoToServer3(query, "POST", JSON.stringify({ reason }));
//         if (response.message === 'Operation reussie') {
//           setStudent(response.student);  // Assure-toi que l'objet 'student' existe bien dans la réponse
//           alert("Enregistrement effectué");
//           setScanned(true);
//           setLoading(true);
//           setIsCameraActive(false);
//           setResult(currentResult);
//         } else {
//           alert("Étudiant non trouvé");
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération des détails de l'étudiant:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//   };

//   const pointsStudent = () => {
//     navigate(`/points/student/${student?.Id}`, { state: { studentFirstName: student?.FisrtName, studentLastName: student?.LastName } });
//   };

//   return (
//     <div>
//       <h1>Scanner le QR Code</h1>

//       {isCameraActive && !scanned && (
//         <QrReader
//           delay={300}
//           onError={handleError}
//           onResult={handleScan}
//           style={{ width: '50%', height: 'auto' }}
//         />
//       )}

//       {result && <p>QR Code scanné : {result}</p>}

//       {student && (
//         <div>
//           <h2>Bienvenue {student.FisrtName} {student.LastName}</h2>
//           <button onClick={pointsStudent}>Voir mes points</button>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/QRCodeScanner.css';
import { GoToServer3 } from '../fetch';

export default function QRCodeScanner() {
  const [result, setResult] = useState(null);
  const [student, setStudent] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { reason } = location.state || {};
  const lastScannedRef = useRef(null); // Référence pour stocker le dernier code scanné

  const handleScan = async (data) => {
    const currentResult = data?.text;

    // Vérifie que le scan est valide et que ce n'est pas le même que le précédent
    if (currentResult && currentResult !== lastScannedRef.current && !scanned && !loading) {
      lastScannedRef.current = currentResult; // Met à jour le dernier scanné
      setResult(currentResult);
      setScanned(true);
      setIsCameraActive(false); // Désactiver la caméra

      try {
        setLoading(true); // Démarre le chargement
        const query = `/api/student/${currentResult}`;
        const response = await GoToServer3(query, "POST", JSON.stringify({ reason }));

        if (response.message === 'Operation reussie') {
          setStudent(response.student);
          alert("Enregistrement effectué");
        } else {
          alert("Étudiant non trouvé");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'étudiant:", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    }
  };

  const handleError = (err) => {
    console.error("Erreur de scanner:", err);
  };

  const pointsStudent = () => {
    if (student) {
      navigate(`/points/student/${student.Id}`, { state: { studentFirstName: student.FirstName, studentLastName: student.LastName } });
    }
  };

  return (
    <div>
      <h1>Scanner le QR Code</h1>

      {isCameraActive && !scanned && (
        <QrReader
          delay={300}
          onError={handleError}
          onResult={handleScan}
          style={{ width: '50%', height: 'auto' }}
        />
      )}

      {result && <p>QR Code scanné : {result}</p>}

      {student && (
        <div>
          <h2>Bienvenue {student.FirstName} {student.LastName}</h2>
          <button onClick={pointsStudent}>Voir mes points</button>
        </div>
      )}
    </div>
  );
}










// import React, { useEffect, useState } from 'react';
// import { QrReader } from 'react-qr-reader';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../css/QRCodeScanner.css';
// import { GoToServer, GoToServer3 } from '../fetch';

// export default function QRCodeScanner() {
//   const [result, setResult] = useState(null);
//   const [student, setStudent] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isCameraActive, setIsCameraActive] = useState(true); // Gère l'état de la caméra
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { reason } = location.state || {};

//   // useEffect(() => {
//   //   if (student) {
//   //     console.log('Student data updated:', student);
//   //   }
//   // }, [student]);
  

//   const handleScan = async (data) => {
//     console.log("data", data);
//     console.log("result", result );
//     console.log("isCameraActive1", isCameraActive);


//     // if (data && !scanned && !loading) {  
//       if (data && !scanned && !student && !loading) {

//         const currentResult = data.text;  // Assurez-vous d'utiliser `data.text` pour obtenir le texte du QR code

//         if (!currentResult || currentResult === result) {
//           return; // Évite de re-scanner le même QR code
//         }

//         setScanned(true);  // Empêche d'autres scans
//         setLoading(true);   // Indique que la requête est en cours
//         setIsCameraActive(false); // Désactive la caméra après le scan réussi
//         setResult(currentResult);
//        // Utiliser data comme une variable temporaire pour result
//       // const currentResult = data;  // Variable temporaire pour la valeur actuelle de result
      

//       console.log("currentResult", currentResult );
//       console.log("isCameraActve", isCameraActive );

//       // Faire une requête API pour récupérer les détails de l'étudiant
//       const query = `/api/student/${data}`;
//       console.log("reason", reason);
//       console.log("result", result);
//       // console.log("result.text", result.text);
      
//       try {
//         const response = await GoToServer3(query, "POST", JSON.stringify({ reason }));
//         console.log("Server response:", response);
//         console.log("student", response.student);
//         console.log("studentId", response.student.Id);
//         console.log("message", response.message);
//         // setStudent(response);
//         // alert("Enregistrement effectué");
//         // console.log("student", student);


//         if (response.message === 'Operation reussie') {
//           // const studentData = await response.json();
//           setStudent(response);
//           alert("Enregistrement effectué");
//         } else {
//           // Traitez la réponse ici, même si elle n'est pas OK
//           // const errorData = await response.json();
//           // console.error('Étudiant non trouvé', errorData);
//           alert("Étudiant non trouvé");
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des détails de l\'étudiant:', error);
//       }
//       finally {
//         setLoading(false);  // Réinitialise l'état de chargement
//       }
//     }}
  
  

//   const handleError = (err) => {
//     console.error(err);
//   };

//   const pointsStudent = () => {
//     navigate(`/points/student/${student.Id}`, { state: { studentFirstName: student.FirstName, studentLastName: student.LastName } });
//   };


//   return (
//     <div>
//       <h1>Scanner le QR Code</h1>

//       {/* Désactiver ou cacher le scanner si un QR code est déjà scanné */}
//       {isCameraActive && !scanned && (
//         <QrReader
//           delay={300}
//           onError={handleError}
//           onResult={handleScan}
//           style={{ width: '50%', height: 'auto' }}
//         />
//       )}

//       {result && <p>QR Code scanné : {result.text}</p>}

//       {student && (
//         <div>
//           <h2>Bienvenue {student.FirstName} {student.LastName}</h2>
//           <button onClick={pointsStudent}>Voir mes points</button>
//         </div>
//       )}
//     </div>
//   );
// }




