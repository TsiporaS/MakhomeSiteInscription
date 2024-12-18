import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import '../css/PointsStudent.css'; // Import the CSS file
import { GoToServer } from '../fetch';

export default function PointsStudent() {
    const navigate = useNavigate();
    const studentId = useParams();
    const [points, setPoints] = useState(0);
    const location = useLocation();
    const { studentFirstName, studentLastName } = location.state || {};

    useEffect(() => {
        fetchStudentPoints();
      }, [points]);

      const fetchStudentPoints = () => {
        console.log("studentId", studentId.studentId);
        const query = `/manager/student/${studentId.studentId}/points`; // Requête pour obtenir les détails de l'étudiant
        GoToServer(query, "GET")
          .then((response) => {
            console.log("Points de l'étudiant:", response[0].Points);
            setPoints(response[0].Points)
          
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des détails de l'étudiant:", error);
          });
      };

      // Fonction pour retourner à la page précédente
    const backToHome = () => {
      navigate("/home");
    };
  

    return (
        <div className="category" >
            <h2 >Voici les points de: </h2>
            <h1>{studentFirstName} {studentLastName}</h1>

            <p> Félicitations ! Tu as {points} points </p>

            <button onClick={backToHome}>Retour</button>


        </div>
    );
}

