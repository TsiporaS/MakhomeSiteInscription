import React, { useState, useContext } from 'react';
import { GoToServer, GoToServer1 } from '../fetch';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import '../css/LogInManager.css';

export default function LogInManager(){
    const [loginData, setLoginData] = useState({ LastName: '', FirstName: '', Password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const query = `/manager/login`;

        GoToServer(query, "POST", loginData)
            .then((response) => {
                console.log('Server response:', response);
                
                setUser({ FirstName: loginData.FirstName, LastName: loginData.LastName, Id: loginData.Id });
                navigate('/manager/home');
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage('Username or password is incorrect.');
            });
    };

    const handleSignUpClick = () => {
        navigate('/manager/signup');
    };

    return (
        <div>
            <h1>Se connecter</h1>

                <form className="forms" onSubmit={handleLoginSubmit}>
                    <div>
                        <label htmlFor="LastName">Nom:</label>
                        <input
                            type="text"
                            id="LastName"
                            name="LastName"
                            value={loginData.LastName}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="FirstName">Prénom:</label>
                        <input
                            type="text"
                            id="FirstName"
                            name="FirstName"
                            value={loginData.FirstName}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="Password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="Password"
                            value={loginData.Password}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <button type="submit">Se connecter</button>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="signup-button">
                        <button onClick={handleSignUpClick}>S'inscrire</button>
                    </div>
                </form>
        </div>
    );
}

