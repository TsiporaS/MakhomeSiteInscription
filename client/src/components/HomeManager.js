import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { UserContext } from './UserContext'; // Importer le contexte utilisateur
import '../css/HomeManager.css';


export default function HomeManager(){

    const { user } = useContext(UserContext); // Obtenir l'utilisateur depuis le contexte
    console.log("user",user);
    const navigate = useNavigate();

    // Vérifier si l'utilisateur est connecté, sinon rediriger vers la page de connexion
    const checkAuthentication = (callback) => {
        if (!user) {
            alert("Vous devez d'abord etre connecté.")
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

    const viewManager = () => {
        navigate('/manager/account', { state: { firstname: user.FirstName, lastname: user.LastName } });
    };

   return (
        <div>
            <div className="header">
                {(user ? <h1>Bienvenue {user.FirstName} {user.LastName} </h1> : <h1>Bienvenue </h1>)}
                {/* <h1>Bienvenue {user.FirstName} {user.LastName} </h1> */}
             </div>
            <button onClick={studentsToAccept}> Voir les étudiants préinscrits </button>

            <button onClick={allTheStudents}> Voir les étudiants inscrits </button>

            <button onClick={addNewManager}> Enregistrer un nouveau Rav </button>

            <button onClick={goToStudentProfile}> Afficher l'interface étudiant </button>

            { user &&  
            <button onClick={viewManager}> Voir mon compte </button>
            }
           
           
        </div>
    );
    
}