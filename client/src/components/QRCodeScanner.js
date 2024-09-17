import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

export default function QRCodeScanner() {
  const [result, setResult] = useState(null);
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  const handleScan = async (data) => {
    if (data) {
      setResult(data);

      // Faire une requête API pour récupérer les détails de l'étudiant
      try {
        const response = await fetch(`/api/student/${data}`);
        if (response.ok) {
          const studentData = await response.json();
          setStudent(studentData);
          // Rediriger vers la page de bienvenue avec les détails de l'étudiant
          // navigate(`/welcome/${studentData.BarCode}`);
        } else {
          console.error('Étudiant non trouvé');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'étudiant:', error);
      }
    }
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
      {student && (
        <div>
          <h2>Bienvenue {student.FirstName} {student.LastName}</h2>
        </div>
      )}
    </div>
  );
}
