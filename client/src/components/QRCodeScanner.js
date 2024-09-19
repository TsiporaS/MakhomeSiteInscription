import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/QRCodeScanner.css';
import { GoToServer } from '../fetch';


export default function QRCodeScanner() {
  const studentId = useParams();
  const [result, setResult] = useState(null);
  const [student, setStudent] = useState(null);
  const [reason, setReason] = useState(""); // État pour le choix déroulant
  const navigate = useNavigate();

  const handleScan = async (data) => {
    console.log("data", data);
    if (data) {
      setResult(data);

      // Faire une requête API pour récupérer les détails de l'étudiant
    //   try {

    //   const query = `/api/student/${data}`;    
    //     const response = await  GoToServer(query, "POST", reason);
        
    //     if (response.status === 200) {
    //       console.log("Server response:", response);
    //       const studentData = await response.json();
    //       setStudent(studentData);
    //       alert("Enregistrement effectué");
    //       // Rediriger vers la page de bienvenue avec les détails de l'étudiant
    //       // navigate(`/welcome/${studentData.BarCode}`);
    //     } else {
    //       console.error('Student not found');
    //       alert("Étudiant non trouvé");
    //     }
    //   } catch (error) {
    //     console.error('Erreur lors de la récupération des détails de l\'étudiant:', error);
    //   }
    // }

        const query = `/api/student/${data}`;    
        await  GoToServer(query, "POST", reason)
        .then(async (response) => {
          console.log("Server response:", response);
          const studentData = await response.json();
          setStudent(studentData);
          alert("Enregistrement effectué");
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des étudiants:", error);
        });
      }
        
  };
  
  const handleError = (err) => {
    console.error(err);
  };

  const pointsStudent = () => {
    navigate(`/points/student/${studentId}`, { state: { studentFirstName: student.FirstName, studentLastName: student.LastName } }); 
  };


  return (
    <div>
      <h1>Scanner le QR Code</h1>
      <QrReader
        delay={300}
        onError={handleError}
        onResult={handleScan}
        style={{ width: '100%' }}
      />

      {result && <p>QR Code scanné : {result.text}</p>}


      <h3>Sélectionnez l'objet de votre venue *</h3>
      <select value={reason} onChange={(e) => setReason(e.target.value)} required>
        <option value="">Sélectionner</option>
        <option value="Cafeteria">Cafeteria</option>
        <option value="Conference">Conference</option>
      </select>


      {student && (
        <div>
          <h2>Bienvenue {student.FirstName} {student.LastName}</h2>
      
          <button onClick={pointsStudent}>Voir mes points</button>
        </div>
      )}
    </div>
  );
}
