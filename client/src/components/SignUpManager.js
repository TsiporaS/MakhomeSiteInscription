import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoToServer, convertFormDataToArray } from "../fetch";
import '../css/SignUpManager.css'; // Import the CSS file
import { UserContext } from "./UserContext";

export default function SignUpManager() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
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
      Email,
      Password
    } = formData;
    
    let missingFields = [];

    if (FirstName === "") missingFields.push("Prénom");
    if (LastName === "") missingFields.push("Nom");
    if (Email === "") missingFields.push("Email");
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
        setUser({ FirstName: formData.FirstName, LastName: formData.LastName, Id: formData.Id });


        // Clear form fields
        setFormData({
          FirstName: "",
          LastName: "",
          Email: "",
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
          <label htmlFor="email">Email: *</label>
          <input
            type="text"
            id="email"
            name="Email"
            value={formData.Email}
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
