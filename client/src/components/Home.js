import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { GoToServer, GoToServer1 } from '../fetch';
import '../css/Home.css'

export default function Home() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    
    const goToScann = () => {
        
        navigate(`/scann`);
    };

    const goToSignUp = () => {
       
        navigate(`/signup`);
    };

    return (
        <div>
            <div className="header">
                <h1>Bienvenue </h1>
             </div>
            <h2>Déjà venu au Makhome ?</h2>
            <button onClick={goToScann}> Scanner </button>

            <h2>Si tu es nouveau, inscris toi:</h2>
    
            <button onClick={goToSignUp}> S'inscrire </button>
           
        </div>
    );
}
