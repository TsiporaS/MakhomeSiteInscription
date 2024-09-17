import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { GoToServer, GoToServer1 } from '../fetch';
import '../css/StudentDetails.css'; // Import the CSS file

export default function StudentDetails() {
    const { studentId } = useParams(); // Récupère l'ID de l'étudiant depuis l'URL
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    
    useEffect(() => {
        fetchStudentDetails();
      }, []);
    
      const fetchStudentDetails = () => {
        const query = `/manager/student/${studentId}`; // Requête pour obtenir les détails de l'étudiant
        GoToServer(query, "GET")
          .then((response) => {
            console.log("Détails de l'étudiant:", response);
            setStudent(response); // Stocke les détails de l'étudiant
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des détails de l'étudiant:", error);
          });
      };
    
      const pointsStudent = () => {
        navigate(`/manager/points/student/${studentId}`, { state: { studentFirstName: student.FirstName, studentLastName: student.LastName } }); // Redirige après acceptation
        // const query = `/manager/student/${studentId}/accept`;
        // GoToServer(query, "POST")
        //   .then(() => {
        //     alert("Étudiant accepté");
        //     navigate("/students"); // Redirige après acceptation
        //   })
        //   .catch((error) => {
        //     console.error("Erreur lors de l'acceptation de l'étudiant:", error);
        //   });
      };
      
    
      if (!student) {
        return <p>Chargement...</p>;
      }
    
      return (
        <div>
          <h1>Détails de l'étudiant</h1>
          <p><strong>Nom :</strong> {student.LastName}</p>
          <p><strong>Prénom :</strong> {student.FirstName}</p>
          <p><strong>Téléphone :</strong> {student.Phone}</p>
          <p><strong>Email :</strong> {student.Email}</p>
          <p><strong>Adresse :</strong> {student.Road}</p>
          <p><strong>Pays :</strong> {student.Country}</p>
          <p><strong>Ville :</strong> {student.City}</p>
          <p><strong>Code postal :</strong> {student.PostalCode}</p>
          <p><strong>Date de naissance :</strong> {student.Birthday}</p>
          <p><strong>Domaine d'études :</strong> {student.Studies}</p>
          <p><strong>Année d'études :</strong> {student.Year}</p>
          <p><strong>Lycée fréquenté :</strong> {student.School}</p>
          <p><strong>Communauté :</strong> {student.Comunity}</p>
          <p><strong>Prénom du parent :</strong> {student.ParentFirstName}</p>
          <p><strong>Nom du parent :</strong> {student.ParentLastName}</p>
          <p><strong>Contact du parent :</strong> {student.ParentPhone}</p>
    
          <button onClick={pointsStudent}>Voir ses points</button>
          <button onClick={() => navigate(-1)}>Retour</button>
        </div>
      );
}

