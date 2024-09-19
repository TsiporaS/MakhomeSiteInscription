import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { UserContext } from './UserContext'; // Importer le contexte utilisateur
import '../css/HomeManager.css';


export default function HomeManager(){

    const { user } = useContext(UserContext); // Obtenir l'utilisateur depuis le contexte

    const navigate = useNavigate();

    // Vérifier si l'utilisateur est connecté, sinon rediriger vers la page de connexion
    const checkAuthentication = (callback) => {
        if (!user) {
            navigate('/manager/login'); // Rediriger vers la page de login si non connecté
        } else {
            callback();
        }
    };
    
    const studentsToAccept = () => {
        checkAuthentication(() => {
            navigate(`/manager/home/students`);
        });
    };

    const allTheStudents = () => {
        checkAuthentication(() => {
            navigate(`/manager/home/allStudents`);
        });
    };

    const addNewManager = () => {
        checkAuthentication(() => {
            navigate(`/manager/signup`);
        });
    };

    const goToStudentProfile = () => {
        checkAuthentication(() => {
            navigate(`/home`);
        });
    };

   return (
        <div>
            <div className="header">
                <h1>Bienvenue </h1>
             </div>
            <button onClick={studentsToAccept}> Voir les étudiants préinscrits </button>

            <button onClick={allTheStudents}> Voir les étudiants inscrits </button>

            <button onClick={addNewManager}> Enregistrer un nouveau Rav </button>

            <button onClick={goToStudentProfile}> Afficher l'interface étudiant </button>
           
        </div>
    );
    
}