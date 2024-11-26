import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { GoToServer, GoToServer1 } from '../fetch';
import '../css/StudentPreinscritDetails.css'; // Import the CSS file

export default function StudentPreinscritDetails() {
    const { studentId } = useParams(); // Récupère l'ID de l'étudiant depuis l'URL
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    
    useEffect(() => {
        fetchStudentDetails();
      }, []);
    
      const fetchStudentDetails = () => {
        const query = `/manager/studentpreinscrit/${studentId}`; // Requête pour obtenir les détails de l'étudiant
        GoToServer(query, "GET")
          .then((response) => {
            console.log("Détails de l'étudiant:", response);
            setStudent(response); // Stocke les détails de l'étudiant
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des détails de l'étudiant:", error);
          });
      };
    
      const acceptStudent = () => {
        navigate(`/manager/accept/student/${studentId}`); 
      };
    
      if (!student) {
        return <p>Chargement...</p>;
      }

      // Fonction utilitaire pour formater la date
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
   };
  
        return (
          <div>
            <h1>Détails de l'étudiant</h1>
            <p><strong>Nom :</strong> <span className="student-data">{student.LastName}</span></p>
            <p><strong>Prénom :</strong> <span className="student-data">{student.FisrtName}</span></p>
            <p><strong>Téléphone :</strong> <span className="student-data">{student.Phone}</span></p>
            <p><strong>Email :</strong> <span className="student-data">{student.Email}</span></p>
            <p><strong>Adresse / Code postal :</strong> <span className="student-data">{student.Adress}</span></p>
            <p><strong>Date de naissance :</strong> <span className="student-data">{formatDate(student.Birthday)}</span></p>
            <p><strong>Domaine d'études :</strong> <span className="student-data">{student.Studies}</span></p>
            <p><strong>Année d'études :</strong> <span className="student-data">{student.Year}</span></p>
            <p><strong>Lycée fréquenté :</strong> <span className="student-data">{student.School}</span></p>
            <p><strong>Communauté :</strong> <span className="student-data">{student.Community}</span></p>
        
            <button onClick={acceptStudent}>Accepter</button>
            <button onClick={() => navigate(-1)}>Retour</button>
          </div>
        );
      
}

