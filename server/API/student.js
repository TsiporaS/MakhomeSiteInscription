const { Router } = require("express");
const app = Router();
const bodyParser = require("body-parser");
const { authenticateUser } = require("../BL/fetchUserAndPwd");
const { insertToTable } = require("../BL/insertToTable");
const { fetchDataFromTableCondition } = require("../BL/selectCondition");
const {generateRandomCode} = require("../BL/genereRandomCode")

app.use(bodyParser.json());

//לשאול את המורה איך בודקים שהמשתמש קים בלי שיראו את הסיסמה בכתובת למעלה,
//המורה אמרה לעשות את זה ב post
app.post("/login", async (req, res) => {
  console.log("req.params", req.body);
  const { username, password } = req.body;
  console.log("username", username);
  console.log("password", password);

  try {
    // console.log("hi");
    const user = await authenticateUser(username, password);
    res.status(200).send(user);
  } catch (error) {
    console.error("Error authenticating user:", error.message);
    res.status(401).send("Authentication failed");
  }
});

app.post("/signup", async (req, res) => {
  // const { FirstName, LastName, Phone, Email, Birthday, Country, City, Number, PostalCode, Road, School, Studies, Year, Community, ParentFirstName, ParentLastName, ParentPhone, frequente } = req.body.parameters;
  // console.log("req.body", req.body.parameters);
  
  // try {
    
  //   const myStudent = await fetchDataFromTableCondition("Student", "Email", Email);
  //   console.log("myStudent", myStudent);

  //   const barcode = generateRandomCode(10);
  //   const myStudent2 = await fetchDataFromTableCondition("Student", "BarCode", barcode);
  //   while (myStudent2.length !== 0) {
  //     barcode = generateRandomCode(10);
  //   }

  //   if (myStudent.length === 0) {
  //     insertToTable(
  //       "Student",
  //       "Barcode, FirstName, LastName, Phone, Email, City, Country, PostalCode, Road, Number, Birthday, School, Studies, Year, Community, ParentFirstName, ParentLastName, ParentPhone, frequente",
  //       `'${barcode}', '${FirstName}', '${LastName}', '${Phone}', '${Email}', '${City}', '${Country}', '${PostalCode}', '${Road}', '${Number}', '${Birthday}', '${School}', '${Studies}', '${Year}', '${Community}', '${ParentFirstName}', '${ParentLastName}', '${ParentPhone}', '${frequente}'`
  //     );

const params = req.body.parameters;

const fields = [
  'FirstName', 'LastName', 'Phone', 'Email', 'Birthday', 
  'Country', 'City', 'Number', 'PostalCode', 'Road', 
  'School', 'Studies', 'Year', 'Community', 
  'ParentFirstName', 'ParentLastName', 'ParentPhone', 'frequente'
];

// Extract field values from params
const fieldValues = fields.map(field => params[field]);

console.log("req.body", params);

try {
  const myStudent = await fetchDataFromTableCondition("Student", "Email", fieldValues[3]);
  console.log("myStudent", myStudent);

  let barcode = generateRandomCode(10);
  let myStudent2 = await fetchDataFromTableCondition("Student", "BarCode", barcode);
  
  while (myStudent2.length !== 0) {
    barcode = generateRandomCode(10);
    myStudent2 = await fetchDataFromTableCondition("Student", "BarCode", barcode);
  }

  if (myStudent.length === 0) {
    const columnNames = fields.map(field => field).join(', ');
    const columnValues = [
      `'${barcode}'`,
      ...fieldValues.map(value => `'${value}'`)
    ].join(', ');

    await insertToTable(
      "Student",
      columnNames,
      columnValues
    );
  
      

      res.status(200).json({ message: "Student added successfully", itsbarcode: barcode });
      console.log("status", "Student added successfully");
    } else {
      console.error("Student already exsist ");
      res.status(409).json({ message: "Student already exists" });
    }
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Internal server error" });
    console.log("status", "Authentication failed");
  }
});

// Exemple d'endpoint pour obtenir les détails d'un étudiant par son code
app.get('/api/student/:barcode', async (req, res) => {
  const barcode = req.params.barcode;

  try {
    // Rechercher l'étudiant avec le code-barres
    const student = await fetchDataFromTableCondition("Student", "BarCode", barcode);

    if (student.length > 0) {
      res.json(student[0]); // Renvoie le premier étudiant trouvé
    } else {
      res.status(404).json({ message: 'Étudiant non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'étudiant:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});


app.post('/api/insert-data', async (req, res) => {
  const data = req.body;
  console.log("Données reçues:", data);

try {
  await insertToTable(
    "StudentToAccept",
    "FirstName, LastName, Phone, Email, Address, Birthday, Studies, Year, School, Community, Terms",
    `'${data.FirstName}', '${data.LastName}', '${data.Phone}', '${data.Email}', '${data.Address}', '${data.Birthday}', 
    '${data.Studies}', '${data.Year}', '${data.School}', '${data.Community}', '${data.Terms}'`
  );
   
   console.log('Données insérées avec succès:', result);
   res.status(200).send({ message: "Données insérées avec succès !" });
  
} catch (error) {
  console.error("Error during insertion:", error.message);
  res.status(500).json({ message: "Internal server error during insertion to StudentToAccept" });
  console.log("status", "Authentication failed");
}
});

module.exports = app;
