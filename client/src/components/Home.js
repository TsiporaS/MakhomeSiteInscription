import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { GoToServer, GoToServer1 } from '../fetch';
import '../css/Home.css'

export default function Home() {
    const { user } = useContext(UserContext);
    const [reason, setReason] = useState(""); // État pour le choix déroulant
    const navigate = useNavigate();
    
    const goToScann = () => {
        
        navigate(`/scann`, { state: { reason: reason } });
    };

    const goToSignUp = () => {
       
        navigate(`/signup`);
    };

    return (
        <div>
            <div className="header">
                <h1>Bienvenue </h1>
             </div>
            <h2>Déjà inscrit au Makhome ?</h2>

            {/* <h3>Sélectionnez l'objet de votre venue *</h3>
            <select value={reason} onChange={(e) => setReason(e.target.value)} required>
            <option value="">Sélectionner</option>
            <option value="Cafeteria">Cafeteria</option>
            <option value="Conference">Conference</option>
            </select> */}

               <div className='boutons'>
                  <button
                  onClick={() => setReason("Cafeteria")}
                //   style={{ backgroundColor: reason === "Cafeteria" ? 'lightblue' : 'white' }}
                  >
                  Cafeteria
                 </button>
                 <button
                   onClick={() => setReason("Conference")}
                //    style={{ backgroundColor: reason === "Conference" ? 'lightblue' : 'white' }}
                 >
                  Conference
                 </button>
                </div>

                  {reason && <h4>Objet sélectionné: {reason}</h4>}
   
            <button onClick={goToScann}> Scanner </button>

            {/* <h2>Si tu es nouveau, inscris toi:</h2>
    
            <button onClick={goToSignUp}> S'inscrire </button> */}
           
        </div>
    );
}
