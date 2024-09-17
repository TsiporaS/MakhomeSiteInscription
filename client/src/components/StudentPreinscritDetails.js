import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { GoToServer, GoToServer1 } from '../fetch';
import '../css/CategoryDetails.css'; // Import the CSS file

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
        navigate(`/manager/accept/student/${studentId}`); // Redirige après acceptation
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
    
    //   const rejectStudent = () => {
    //     const query = `/manager/student/${studentId}/reject`;
    //     GoToServer(query, "POST")
    //       .then(() => {
    //         alert("Étudiant refusé");
    //         navigate("/students"); // Redirige après rejet
    //       })
    //       .catch((error) => {
    //         console.error("Erreur lors du rejet de l'étudiant:", error);
    //       });
    //   };
    
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
          <p><strong>Adresse :</strong> {student.Adress}</p>
          <p><strong>Date de naissance :</strong> {student.Birthday}</p>
          <p><strong>Domaine d'études :</strong> {student.Studies}</p>
          <p><strong>Année d'études :</strong> {student.Year}</p>
          <p><strong>Lycée fréquenté :</strong> {student.School}</p>
          <p><strong>Communauté :</strong> {student.Comunity}</p>
    
          <button onClick={acceptStudent}>Accepter</button>
          <button onClick={() => navigate(-1)}>Retour</button>
        </div>
      );
}

