import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import '../css/QRCodeScanner.css';


export default function QRCodeScanner() {
  const [result, setResult] = useState(null);
  const [student, setStudent] = useState(null);
  const [reason, setReason] = useState(""); // État pour le choix déroulant
  const navigate = useNavigate();

  const handleScan = async (data) => {
    if (data) {
      setResult(data);

      // Faire une requête API pour récupérer les détails de l'étudiant
      try {

      const query = `/api/student/${data}`;    
        const response = await  GoToServer(query, "POST", reason);
        
        if (response === 200) {
          console.log("Server response:", response);
          alert("Enregistrement effectué");
          const studentData = await response.json();
          setStudent(studentData);
          // Rediriger vers la page de bienvenue avec les détails de l'étudiant
          // navigate(`/welcome/${studentData.BarCode}`);
        } else {
          console.error('Student not found');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'étudiant:', error);
      }
    }
  };

  const pointsStudent = () => {
    navigate(`/points/student/${studentId}`, { state: { studentFirstName: student.FirstName, studentLastName: student.LastName } }); 
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <h1>Scanner le QR Code</h1>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />

      <h3>Entrez l'objet de votre venue</h3>
      <select value={reason} onChange={(e) => setReason(e.target.value)}>
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
