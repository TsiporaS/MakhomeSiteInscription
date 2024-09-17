import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoToServer, convertFormDataToArray } from "../fetch";
import '../css/SignUpManager.css'; // Import the CSS file

export default function SignUpManager() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      FirstName,
      LastName,
      Password
    } = formData;
    
    let missingFields = [];

    if (FirstName === "") missingFields.push("Prénom");
    if (LastName === "") missingFields.push("Nom");
    if (Password === "") missingFields.push("Mot de passe");
    
    if (missingFields.length > 0) {
      alert(`Les champs suivants sont obligatoires: ${missingFields.join(", ")}`);
      return;
    }

    const query = `/manager/signup`;    
    const parameters = convertFormDataToArray(formData);

    GoToServer(query, "POST", parameters )
      .then((response) => {
        console.log("Server response:", response.message);
        alert("Enregistrement effectué");

        // Clear form fields
        setFormData({
          FirstName: "",
          LastName: "",
          Password: ""
        });
        navigate('/manager/home');
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });
  };

  // Fonction pour retourner à la page précédente
  const backToHome = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>Bonjour !</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lastname">Nom: *</label>
          <input
            type="text"
            id="lastname"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="firstname">Prénom: *</label>
          <input
            type="text"
            id="firstname"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            required
          />
        </div>
       
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">S'inscrire</button>
      </form>

  
      <button onClick={backToHome}>Retour</button>
      
    </div>
  );
}
