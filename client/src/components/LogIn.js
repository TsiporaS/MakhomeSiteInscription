import React, { useState, useContext } from 'react';
import { GoToServer, GoToServer1 } from '../fetch';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import '../css/LogIn.css'; // Import the CSS file

export default function LogIn() {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showGiftForm, setShowGiftForm] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [giftCardNumber, setGiftCardNumber] = useState('');
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

    const handleGiftCardChange = (e) => {
        setGiftCardNumber(e.target.value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const query = `/login`;

        GoToServer(query, "POST", loginData)
            .then((response) => {
                console.log('Server response:', response);
                
                setUser({ username: loginData.username, id: loginData.userId });
                navigate('/home');
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage('Username or password is incorrect.');
            });
    };

    const handleGiftSubmit = (e) => {
        e.preventDefault();
        console.log('Gift card number submitted:', giftCardNumber);
       navigate(`/gift/${giftCardNumber}`)
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    return (
        <div>
            <h1>Login</h1>
            <div className="buttons">
                <button onClick={() => {
                    setShowLoginForm(!showLoginForm);
                    setShowGiftForm(false);
                }}>
                    Login
                </button>
                <button onClick={() => {
                    setShowGiftForm(!showGiftForm);
                    setShowLoginForm(false);
                }}>
                    Receiving a gift?
                </button>
            </div>

            {showLoginForm && (
                <form className="forms" onSubmit={handleLoginSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={loginData.username}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="signup-button">
                        <button onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </form>
            )}

            {showGiftForm && (
                <form className="forms" onSubmit={handleGiftSubmit}>
                    <div>
                        <label htmlFor="giftCardNumber">Gift Card Number:</label>
                        <input
                            type="text"
                            id="giftCardNumber"
                            name="giftCardNumber"
                            value={giftCardNumber}
                            onChange={handleGiftCardChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}
