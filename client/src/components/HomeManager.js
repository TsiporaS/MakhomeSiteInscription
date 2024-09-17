import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import '../css/HomeManager.css';


export default function HomeManager(){

    const navigate = useNavigate();
    
    const studentsToAccept = () => {
        
        navigate(`/manager/home/students`);
    };

    const allTheStudents = () => {
       
        navigate(`/manager/home/allStudents`);
    };

    const addNewManager = () => {
       
        navigate(`/manager/signup`);
    };

   return (
        <div>
            <div className="header">
                <h1>Bienvenue </h1>
             </div>
            <button onClick={studentsToAccept}> Voir les étudiants préinscrits </button>

            <button onClick={allTheStudents}> Voir les étudiants inscrits </button>

            <button onClick={addNewManager}> Enregistrer un nouveau Rav </button>
           
        </div>
    );
    
}