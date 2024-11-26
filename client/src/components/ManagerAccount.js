import React, { useContext, useEffect, useState } from 'react';
import { GoToServer } from '../fetch';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/PasswordRecoveryManager.css';
import { UserContext } from './UserContext';

export default function ManagerAccount() {

    const [manager, setManager] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const { firstname, lastname } = location.state || {};


    useEffect(() => {
        getManager();
      }, []);


    const getManager = () => {
        const query = `/manager-account`;
        const parameters = { firstname, lastname };
        console.log("parameters", parameters);

        GoToServer(query, "POST", parameters )
            .then((response) => {
                setManager(response.manager);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const updatePassword = () => {
        navigate("/manager/forgot-password");
    }

    

    return (
        <div>
            <h1>Mon compte</h1>

            <p><strong>Nom :</strong> {lastname}</p>
            <p><strong>Prénom :</strong> {firstname}</p>
            <p><strong>Email :</strong> {manager.email}</p>

            <button onClick={updatePassword}> Modifier mon mot de passe </button>
            
        </div>
    );
}
