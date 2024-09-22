import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/QRCodeScanner.css';
import { GoToServer, GoToServer3 } from '../fetch';

export default function QRCodeScanner() {
  const [result, setResult] = useState(null);
  const [student, setStudent] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { reason } = location.state || {};


  // const handleScan = async (data) => {
  //   console.log("data", data);
  //   console.log("result", result );


    // if (data && !scanned ) {  

    //   setScanned(true);  
    //   setLoading(true);  // Indique que la requête est en cours

    //    // Utiliser data comme une variable temporaire pour result
    //   const currentResult = data;  // Variable temporaire pour la valeur actuelle de result
    //   setResult(currentResult);

    //   console.log("result", result );

    //   // Faire une requête API pour récupérer les détails de l'étudiant
    //   const query = `/api/student/${data}`;    
    //     console.log("reason", reason);
    //     await  GoToServer(query, "POST", JSON.stringify({ reason }))
    //     .then(async (response) => {
    //       console.log("Server response:", response);
    //       const studentData = await response.json();
    //       setStudent(studentData);
    //       alert("Enregistrement effectué");
    //     })
    //     .catch((error) => {
    //       console.error("Erreur lors de la récupération des étudiants:", error);
          
    //     });
    //   }
    // }
  

  const handleScan = async (data) => {
    console.log("data", data);
    console.log("result", result );


    // if (data && !scanned && !loading) {  
       if (data && !scanned && !student) {

      setScanned(true);  
      setLoading(true);  // Indique que la requête est en cours

       // Utiliser data comme une variable temporaire pour result
      const currentResult = data;  // Variable temporaire pour la valeur actuelle de result
      setResult(currentResult);

      console.log("result", result );

      // Faire une requête API pour récupérer les détails de l'étudiant
      const query = `/api/student/${data}`;
      console.log("reason", reason);
      console.log("result", result);
      // console.log("result.text", result.text);
      
      try {
        const response = await GoToServer3(query, "POST", JSON.stringify({ reason }));
        console.log("Server response:", response);
        console.log("student", response.student);
        console.log("message", response.message);
        setStudent(response);
        alert("Enregistrement effectué");
        console.log("student", student);


        // if (response.status === 200) {
        //   // const studentData = await response.json();
        //   setStudent(response);
        //   alert("Enregistrement effectué");
        // } else {
        //   // Traitez la réponse ici, même si elle n'est pas OK
        //   // const errorData = await response.json();
        //   // console.error('Étudiant non trouvé', errorData);
        //   alert("Étudiant non trouvé");
        // }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'étudiant:', error);
      }
      // finally {
      //   setLoading(false);  // Réinitialise l'état de chargement
      // };
    }}
  

  // const handleScan = async (data) => {
  //   console.log("data", data);
  
  //   if (data && !scanned) {
  //     setResult(data.text); // Assurez-vous d'utiliser le texte du QR code
  //     setScanned(true);  
  
  //     const query = `/api/student/${data.text}`;
  //     console.log("reason", reason);
      
  //     try {
  //       const response = await GoToServer(query, "POST", JSON.stringify({ reason }));
  //       console.log("Server response:", response);
  
  //       if (response.ok) {
  //         const studentData = await response.json();
  //         setStudent(studentData);
  //         alert("Enregistrement effectué");
  //       } else {
  //         // Traitez la réponse ici, même si elle n'est pas OK
  //         const errorData = await response.json();
  //         console.error('Étudiant non trouvé', errorData);
  //         alert("Étudiant non trouvé");
  //       }
  //     } catch (error) {
  //       console.error('Erreur lors de la récupération des détails de l\'étudiant:', error);
  //     }
  //   }
  // };
  

  const handleError = (err) => {
    console.error(err);
  };

  const pointsStudent = () => {
    navigate(`/points/student/${student.Id}`, { state: { studentFirstName: student.FirstName, studentLastName: student.LastName } });
  };

  return (
    <div>
      <h1>Scanner le QR Code</h1>

      {/* Désactiver ou cacher le scanner si un QR code est déjà scanné */}
      {!scanned && (
        <QrReader
          delay={300}
          onError={handleError}
          onResult={handleScan}
          style={{ width: '50%', height: 'auto' }}
        />
      )}

      {result && <p>QR Code scanné : {result.text}</p>}

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
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import '../css/QRCodeScanner.css';
// import { GoToServer } from '../fetch';


// export default function QRCodeScanner() {
//   const studentId = useParams();
//   const [result, setResult] = useState(null);
//   const [student, setStudent] = useState(null);
//   // const [reason, setReason] = useState(""); // État pour le choix déroulant
//   const [scanned, setScanned] = useState(false);  // Ajoutez un état pour gérer si le scan est terminé
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { reason } = location.state || {};


//   const handleScan = async (data) => {
//     console.log("data", data);
//     console.log("result", result );
//     if (data && !result) {
      
//       setScanned(true);      // Empêcher d'autres scans
//       setResult(data);
//       // Faire une requête API pour récupérer les détails de l'étudiant
//       try {

//       const query = `/api/student/${data.text}`;    
//         const response = await  GoToServer(query, "POST", reason);
        
//         if (response.status === 200) {
//           console.log("Server response:", response);
//           const studentData = await response.json();
//           setStudent(studentData);
//           alert("Enregistrement effectué");
//           // Rediriger vers la page de bienvenue avec les détails de l'étudiant
//           // navigate(`/welcome/${studentData.BarCode}`);
//         } else {
//           console.error('Student not found');
//           alert("Étudiant non trouvé");
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des détails de l\'étudiant:', error);
//       }
//     }

//       //   const query = `/api/student/${data}`;    
//       //   console.log("reason", reason);
//       //   await  GoToServer(query, "POST", reason)
//       //   .then(async (response) => {
//       //     console.log("Server response:", response);
//       //     const studentData = await response.json();
//       //     setStudent(studentData);
//       //     alert("Enregistrement effectué");
//       //   })
//       //   .catch((error) => {
//       //     console.error("Erreur lors de la récupération des étudiants:", error);
//       //   });
//       // }
        
//   };
  
//   const handleError = (err) => {
//     console.error(err);
//   };

//   const pointsStudent = () => {
//     navigate(`/points/student/${studentId}`, { state: { studentFirstName: student.FirstName, studentLastName: student.LastName } }); 
//   };


//   return (
//     <div>
//       <h1>Scanner le QR Code</h1>

      
//       {/* Conditionally render QrReader only if result is not set */}
//       {!scanned && (
//         <QrReader
//           delay={300}
//           onError={handleError}
//           onResult={handleScan}
//           style={{ width: '50%', height: 'auto' }}
//         />
//       )}

//       {result && <p>QR Code scanné : {result.text}</p>}


//       {/* <h3>Sélectionnez l'objet de votre venue *</h3>
//       <select value={reason} onChange={(e) => setReason(e.target.value)} required>
//         <option value="">Sélectionner</option>
//         <option value="Cafeteria">Cafeteria</option>
//         <option value="Conference">Conference</option>
//       </select> */}


//       {student && (
//         <div>
//           <h2>Bienvenue {student.FirstName} {student.LastName}</h2>
      
//           <button onClick={pointsStudent}>Voir mes points</button>
//         </div>
//       )}
//     </div>
//   );
// }

