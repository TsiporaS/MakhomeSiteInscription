import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoToServer, convertFormDataToArray } from "../fetch";
import '../css/Accept.css'; // Import the CSS file

export default function Accept() {
const { studentId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Phone: "",
    Email: "",
    Birthday: "",
    Country: "",
    City: "",
    PostalCode: "",
    Road: "",
    School: "",
    Studies: "",
    Year: "",
    Community: "",
    ParentFirstName: "",
    ParentLastName: "",
    ParentPhone: ""
  });

  
  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = () => {
    const query = `/manager/student/${studentId}`; // Requête pour obtenir les détails de l'étudiant
    GoToServer(query, "GET")
      .then((response) => {
        console.log("Détails de l'étudiant:", response);
        setFormData({
            FirstName: response.FirstName,
            LastName: response.LastName,
            Phone: response.Phone,
            Email: response.Email,
            Birthday: response.Birthday,
            Country: "",
            City: "",
            PostalCode: "",
            Road: "",
            School: response.School,
            Studies: response.Studies,
            Year: response.Year,
            Community: response.Community,
            ParentFirstName: "",
            ParentLastName: "",
            ParentPhone: "",
          }); // Stocke les détails de l'étudiant
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des détails de l'étudiant:", error);
      });
  };

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
      Phone,
      Email,
      Birthday,
      Country,
      City,
      PostalCode,
      Road,
      School,
      Studies,
      Year,
      Community,
      ParentFirstName,
      ParentLastName,
      ParentPhone
    } = formData;
    
    let missingFields = [];

    if (FirstName === "") missingFields.push("Prénom");
    if (LastName === "") missingFields.push("Nom");
    if (Phone === "") missingFields.push("Téléphone");
    if (Email === "") missingFields.push("Email");
    if (Birthday === "") missingFields.push("Date de naissance");
    if (Country === "") missingFields.push("Pays");
    if (City === "") missingFields.push("Ville");
    if (PostalCode === "") missingFields.push("Code postal");
    if (Road === "") missingFields.push("Rue");
    if (School === "") missingFields.push("Lycée");
    if (Studies === "") missingFields.push("Études");
    if (Year === "") missingFields.push("Année");
    
    if (missingFields.length > 0) {
      alert(`Les champs suivants sont obligatoires: ${missingFields.join(", ")}`);
      return;
    }

    if (frequente === "Oui" && Community === "") {
      alert("Veuillez renseigner le nom de la communauté.");
      return;
    }

    const query = `/manager/student/${studentId}/accept`;    
    const parameters = convertFormDataToArray(formData);

    GoToServer(query, "POST", { parameters })
      .then((response) => {
        console.log("Server response:", response.message);
        alert("Enregistrement effectué");
        

        // Clear form fields
        setFormData({
            FirstName: "",
            LastName: "",
            Phone: "",
            Email: "",
            Birthday: "",
            Country: "",
            City: "",
            PostalCode: "",
            Road: "",
            School: "",
            Studies: "",
            Year: "",
            Community: "",
            ParentFirstName: "",
            ParentLastName: "",
            ParentPhone: ""
        });

        const barcodeValue = response.itsbarcode;
        navigate(`/barcode/${barcodeValue}`, { state: { studentFirstName: FirstName, studentLastName: LastName, studentEmail: Email } });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });
  };

  return (
    <div>
      <h3>Inscrire cet étudiant </h3>
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
          <label htmlFor="phone">Numéro de téléphone: *</label>
          <input
            type="text"
            id="phone"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email: *</label>
          <input
            type="email"
            id="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="birthday">Date de naissance: *</label>
          <input
            type="date"
            id="birthday"
            name="Birthday"
            value={formData.Birthday}
            onChange={handleChange}
            required
          />
        </div>
        <h4>Adresse</h4>
        <div>
          <label htmlFor="country">Pays: *</label>
          <input
            type="text"
            id="country"
            name="Country"
            value={formData.Country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">Ville: *</label>
          <input
            type="text"
            id="city"
            name="City"
            value={formData.City}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="postalcode">Code postal: *</label>
          <input
            type="text"
            id="postalcode"
            name="PostalCode"
            value={formData.PostalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="road">Adresse: *</label>
          <input
            type="text"
            id="road"
            name="Road"
            value={formData.Road}
            onChange={handleChange}
            required
          />
        </div>
    
        <div>
          <label htmlFor="school">Lycée fréquenté: *</label>
          <input
            type="text"
            id="school"
            name="School"
            value={formData.School}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="studies">Études: *</label>
          <input
            type="text"
            id="studies"
            name="Studies"
            value={formData.Studies}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="year">Année d'études: *</label>
          <input
            type="text"
            id="year"
            name="Year"
            value={formData.Year}
            onChange={handleChange}
            required
          />
        </div>
        <h4>Fréquentes-tu une communauté ? Si oui, laquelle ? *</h4>
        <div>
            <label htmlFor="community">Communauté:</label>
            <input
              type="text"
              id="community"
              name="Community"
              value={formData.Community}
              onChange={handleChange}
            />
        </div>

        <h4>Contact d'un parent (en cas de besoin)</h4>
        <div>
          <label htmlFor="parentfirstname">Nom:</label>
          <input
            type="text"
            id="parentfirstname"
            name="ParentFirstName"
            value={formData.ParentFirstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="parentlastname">Prénom:</label>
          <input
            type="text"
            id="parentlastname"
            name="ParentLastName"
            value={formData.ParentLastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="parentphone">Téléphone:</label>
          <input
            type="text"
            id="parentphone"
            name="ParentPhone"
            value={formData.ParentPhone}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}
