import React, { useContext, useState, useEffect } from "react";
import { GoToServer } from "../fetch"; // Import de GoToServer pour les requêtes serveur
import { UserContext } from "./UserContext"; // Contexte utilisateur
import { useNavigate } from "react-router-dom"; // Pour la navigation

export default function StudentsToAccept() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [students, setStudents] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  // Fonction pour récupérer les étudiants du serveur
  const fetchStudents = () => {
    const query = `/manager/students/peinscription`;
    GoToServer(query, "GET")
      .then((response) => {
        console.log("Étudiants préinscrits:", response.studentsToAccept);
        setStudents(response.studentsToAccept); // Mise à jour des étudiants
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des étudiants:", error);
      });
  };

  // Fonction pour retourner à la page précédente
  const backToHome = () => {
    navigate(-1);
  };

  // Fonction pour gérer le double-clic et rediriger vers la page des détails
  const handleDoubleClick = (studentId) => {
    navigate(`/manager/student/${studentId}`); // Navigue vers la page de détails avec l'ID de l'étudiant
  };

  // Affiche un message de chargement si les étudiants ne sont pas encore récupérés
  if (!students) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>Étudiants préinscrits</h1>
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
            <th>Date de naissance</th>
            <th>Domaine d'études</th>
            <th>Année d'études</th>
            <th>Lycée fréquenté</th>
            <th>Communauté</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.Id} onDoubleClick={() => handleDoubleClick(student.Id)}>
              <td>{student.LastName}</td>
              <td>{student.FirstName}</td>
              <td>{student.Phone}</td>
              <td>{student.Email}</td>
              <td>{student.Adress}</td>
              <td>{student.Birthday}</td>
              <td>{student.Studies}</td>
              <td>{student.Year}</td>
              <td>{student.School}</td>
              <td>{student.Comunity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
