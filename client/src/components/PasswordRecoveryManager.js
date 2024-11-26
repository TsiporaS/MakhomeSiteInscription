import React, { useState } from 'react';
import { GoToServer } from '../fetch';
import { useNavigate } from 'react-router-dom';
import '../css/PasswordRecoveryManager.css';

export default function PasswordRecoveryManager() {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordResetChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        const query = `/manager/check-email`;

        GoToServer(query, "POST", { email })
            .then((response) => {
                if (response.exists) {
                    setShowPasswordReset(true); // Email exists, show password reset field
                } else {
                    setErrorMessage("Cet email n'est pas encore inscrit. Veuillez vous inscrire.");
                    navigate("/manager/signup");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage('Erreur lors de la vérification de l\'email.');
            });
    };

    const handlePasswordResetSubmit = (e) => {
        e.preventDefault();
        const query = `/manager/reset-password`;

        GoToServer(query, "POST", { email, newPassword })
            .then((response) => {
                if (response.success) {
                    navigate('/manager/login');
                } else {
                    setErrorMessage('Erreur lors de la réinitialisation du mot de passe.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage('Erreur lors de la réinitialisation du mot de passe.');
            });
    };

    return (
        <div>
            <h1>Réinitialiser le mot de passe</h1>

            {!showPasswordReset ? (
                <form onSubmit={handleEmailSubmit}>
                    <label htmlFor="email">Entrez votre email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <button type="submit">Vérifier l'email</button>
                </form>
            ) : (
                <form onSubmit={handlePasswordResetSubmit}>
                    <label htmlFor="newPassword">Entrez votre nouveau mot de passe:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handlePasswordResetChange}
                        required
                    />
                    <button type="submit">Réinitialiser le mot de passe</button>
                </form>
            )}
            
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}
