import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import { GoToServer, GoToServer1 } from '../fetch';
import '../css/ComingsStudent.css'; // Import the CSS file

export default function ComingsStudent() {
    const { studentId } = useParams(); // Récupère l'ID de l'étudiant depuis l'URL
    const navigate = useNavigate();
    const location = useLocation();
    const { studentFirstName, studentLastName } = location.state || {};

    const [comings, setComings] = useState(null);
    
    useEffect(() => {
        fetchComingsDetails();
      }, []);
    
      const fetchComingsDetails = () => {
        const query = `/manager/comings/${studentId}`; // Requête pour obtenir les détails de l'étudiant
        GoToServer(query, "GET")
          .then((response) => {
            console.log("Détails des passages l'étudiant:", response);
            setComings(response); // Stocke les détails de l'étudiant
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des détails de l'étudiant:", error);
          });
      };

    
      return (
        <div>
          <h1>Passages au Makhome de {studentFirstName} {studentLastName}</h1>
        
      <table>
        <thead>
          <tr>
            <th> Date et heure </th>
            <th> Raison de la venue </th>
          </tr>
        </thead>
        <tbody>
          {comings.map((com) => (
            <tr key={com.Id}>
              <td>{com.Date}</td>
              <td>{com.Reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
          <button onClick={() => navigate(-1)}>Retour</button>
        </div>
      );
}

