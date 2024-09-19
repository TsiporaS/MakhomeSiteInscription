import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useContext } from 'react-router-dom';
import { GoToServer } from '../fetch';
import { useLocation } from 'react-router-dom';
import '../css/AllStudents.css'; // Import the CSS file
import { UserContext } from './UserContext';



export default function AllStudents() {
    const [error, setError] = useState(null);
    //const { user } = useContext(UserContext);
    const navigate = useNavigate();
  
    const [students, setStudents] = useState(null);
  
    useEffect(() => {
      fetchStudents();
    }, []);

    // Fonction pour récupérer les étudiants du serveur
  const fetchStudents = () => {
    const query = `/manager/students/allstudents`;
    GoToServer(query, "GET")
      .then((response) => {
        console.log("Tous les étudiants:", response.allstudents);
        setStudents(response.allstudents); // Mise à jour des étudiants
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des étudiants:", error);
      });
  };

  // Fonction pour retourner à la page précédente
  const backToHome = () => {
    navigate("/manager/home");
  };

  // Fonction pour gérer le double-clic et rediriger vers la page des détails
  const handleDoubleClick = (studentId) => {
    navigate(`/manager/student/${studentId}`); // Navigue vers la page de détails avec l'ID de l'étudiant
  };

  // Affiche un message de chargement si les étudiants ne sont pas encore récupérés
  if (!students) {
    return (<div>
      <p>Chargement...</p>
      <button onClick={backToHome}>Retour</button>
      </div>);
  }

   // Fonction utilitaire pour formater la date
   const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
   };
  

    return (
        <div>
            <h1>Tous les étudiants</h1>
      <button onClick={backToHome}>Retour</button>
      
      {/* Table pour afficher les étudiants */}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Adresse</th>
            <th>Pays</th>
            <th>Ville</th>
            <th>Code postal</th>
            <th>Date de naissance</th>
            <th>Domaine d'études</th>
            <th>Année d'études</th>
            <th>Lycée fréquenté</th>
            <th>Communauté</th>
            <th>Prénom du parent</th>
            <th>Nom du parent</th>
            <th>Contact du parent</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.Id} onDoubleClick={() => handleDoubleClick(student.Id)}>
              <td>{student.LastName}</td>
              <td>{student.FisrtName}</td>
              <td>{student.Phone}</td>
              <td>{student.Email}</td>
              <td>{student.Road}</td>
              <td>{student.Country}</td>
              <td>{student.City}</td>
              <td>{student.PostalCode}</td>
              <td>{formatDate(student.Birthday)}</td>
              <td>{student.Studies}</td>
              <td>{student.Year}</td>
              <td>{student.School}</td>
              <td>{student.Community}</td>
              <td>{student.ParentFirstName}</td>
              <td>{student.ParentLastName}</td>
              <td>{student.ParentPhone}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    );
}

