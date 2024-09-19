
const { Router } = require("express");
const app = Router();
const bodyParser = require("body-parser");
const { authenticateUser } = require("../BL/fetchUserAndPwd");
const { fetchDataFromTableCondition } = require("../BL/selectCondition");
const { fetchDataWithManyConditions } = require("../BL/fetchDataWithManyConditions");
const { fetchDataFromTable } = require("../BL/readTable");
const { deleteFromTable } = require("../BL/deleteFromTable");
const { fetchManager, fetchPwdManager } = require("../BL/fetchManagerAndPwd");
const { insertToTable } = require("../BL/insertToTable");
const { generateRandomCode } = require("../BL/genereRandomCode");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const secretKey = "myVerySecretAndComplexKey123!";

app.use(bodyParser.json());

// Token Authentication Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401); // If there's no token, return 401 Unauthorized
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403); // If the token is invalid or expired, return 403 Forbidden
      req.user = user; // Attach the user object to the request
      next(); // Call the next middleware/route handler
    });
  }

app.post("/manager/login", async (req, res) => {
    console.log("req.params", req.body);
    const { LastName, FirstName, Password } = req.body;
    console.log("LastName", LastName);
    console.log("FirstName", FirstName);
    console.log("Password", Password);
  
    try {
      const _manager = await fetchManager(FirstName, LastName); 
      console.log("_manager", _manager);

      if (_manager) {
        const hashedPassword = await fetchPwdManager(_manager.Id);

        // Assurez-vous que vous accédez à la bonne propriété du mot de passe haché
        const hashedPwd = hashedPassword.Password;
            
        // Vérifiez les types
        console.log("Password type:", typeof Password);
        console.log("Hashed password type:", typeof hashedPwd);

        // Comparer le mot de passe fourni avec le mot de passe haché stocké
        const isMatch = await bcrypt.compare(Password, hashedPwd);

        if (isMatch) {
            // Générer le token
            const token = jwt.sign({ id: _manager.Id, firstName: FirstName, lastName: LastName }, secretKey, {
                expiresIn: "1h",
            });
            res.status(200).json({ message: "Login successful", token: token, managerId:  _manager.Id });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } else {
        res.status(404).json({ message: "Manager not found" });
    }
} catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error" });
}
});


  app.post("/manager/signup", async (req, res) => {
    const [ FirstName, LastName, Password ] = req.body;
  
    try {

      const myManager = await fetchDataWithManyConditions("Manager", "FirstName", FirstName, "LastName", LastName);
  
      console.log("myManager", myManager);
      console.log("myManager.length", myManager.length);
      if (myManager.length == 0) {
        const parameters = [FirstName, LastName];
        await insertToTable("Manager", "FirstName, LastName", parameters);

        const thisManager = await fetchDataWithManyConditions("Manager", "FirstName", FirstName, "LastName", LastName);
        const managerId = thisManager[0].Id;

        // Hacher le mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);
        const parameters2 = [managerId, hashedPassword];

        await insertToTable("Password", "ManagerId, Password", parameters2);
  
        // Generate the token
        const token = jwt.sign({ id: managerId, firstName: FirstName, lastName: LastName }, secretKey, {
          expiresIn: "1h",
        });
  
        res.status(200).json({ message: "Manager added successfully", token: token, managerId : managerId });
        console.log("status", "Manager added successfully");
      } else {
        console.error("Manager already exsist ");
        res.status(409).json({ message: "Manager already exists" });
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      res.status(500).json({ message: "Internal server error" });
      // console.log("status", "Authentication failed");
    }
  });
  
  // app.get("/user/:name", authenticateToken, async (req, res) => {
  //   try {
  //     const userName = req.params.name;
  //     // console.log('userName', userName);
  //     const user = await fetchDataFromTableCondition("User", "Mail", userName);
  //     if (!user || user.length === 0) {
  //       res.status(401).send("User not found.");
  //     } else {
  //       const userId = user[0].Id;
  //       // console.log("userId", userId);
  //       // res.status(200).json({ message: user[0].Id });
  //       res.status(200).json({ message: userId });
  //     }
  //   } catch (error) {
  //     console.error("Error finding user:", error.message);
  //     res.status(401).send("Finding User failed");
  //   }
  // });

  app.get("/manager/students/peinscription", async (req, res) => {
    try {
      
      const studentsToAccept = await fetchDataFromTable("StudentToAccept");
      if (!studentsToAccept || studentsToAccept.length === 0) {
        res.status(401).send("Students not found.");
      } else {
        res.status(200).json({ studentsToAccept: studentsToAccept });
      }
    } catch (error) {
      console.error("Error finding Students:", error.message);
      res.status(401).send("Finding Students failed");
    }
  });

  app.get("/manager/studentpreinscrit/:studentId", async (req, res) => {
    try {

    const studentId = req.params.studentId;

    const myStudent = await fetchDataFromTableCondition("StudentToAccept", "Id", studentId);
    console.log("student", myStudent);
      
    if (!myStudent || myStudent.length === 0) {
        res.status(401).send("Students not found.");
      } else {
        res.status(200).json( myStudent[0]);
      }
    } catch (error) {
      console.error("Error finding Student:", error.message);
      res.status(401).send("Finding Student failed");
    }
  });

  app.post("/manager/student/:studentId/accept", async (req, res) => {

    const [ FisrtName, LastName, Phone, Email, Birthday, Country, City, PostalCode, Road, School, 
      Studies, Year, Community, ParentFirstName, ParentLastName, ParentPhone ] = req.body;

const fields = [
  'FirstName', 'LastName', 'Phone', 'Email', 'Birthday', 
  'Country', 'City', 'Road',  
  'School', 'Studies', 'Year', 'Community', 
  'ParentFirstName', 'ParentLastName', 'ParentPhone',
];


try {
  const myStudent = await fetchDataFromTableCondition("Student", "Email", Email);
  console.log("myStudent", myStudent);

  let barcode = generateRandomCode(10);
  let myStudent2 = await fetchDataFromTableCondition("Student", "Barcode", barcode);
  
  while (myStudent2.length !== 0) {
    barcode = generateRandomCode(10);
    myStudent2 = await fetchDataFromTableCondition("Student", "Barcode", barcode);
  }

  if (myStudent.length === 0) {

    const parameters = [barcode, FisrtName, LastName, Phone, Email, Birthday, Country, City, PostalCode, Road, School, 
      Studies, Year, Community, ParentFirstName, ParentLastName, ParentPhone];

    await insertToTable(
      "Student",
      "Barcode, FisrtName, LastName, Phone, Email, Birthday, Country, City, PostalCode, Road, School, Studies, Year, Community, ParentFirstName, ParentLastName, ParentPhone",
      parameters);

    if (res.status(200)) {
        await deleteFromTable("StudentToAccept", "Email", Email);
    }
    
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

app.get("/manager/students/allstudents", async (req, res) => {
    try {
      
      const allstudents = await fetchDataFromTable("Student");
      if (!allstudents || allstudents.length === 0) {
        res.status(401).send("Students not found.");
      } else {
        res.status(200).json({ allstudents: allstudents });
      }
    } catch (error) {
      console.error("Error finding Students:", error.message);
      res.status(401).send("Finding Students failed");
    }
  });

  app.get("/manager/student/:studentId", async (req, res) => {
    try {

    const studentId = req.params.studentId;

    const myStudent = await fetchDataFromTableCondition("Student", "Id", studentId);
      
    if (!myStudent || myStudent.length === 0) {
        res.status(401).send("Student not found.");
      } else {
        res.status(200).json(myStudent[0]);
      }
    } catch (error) {
      console.error("Error finding Student:", error.message);
      res.status(401).send("Finding Student failed");
    }
  });

  app.get("/manager/student/:studentId/points", async (req, res) => {
    try {

    const studentId = req.params.studentId;

    const myStudentPoints = await fetchDataFromTableCondition("Point", "StudentId", studentId);
      
    if (!myStudentPoints || myStudentPoints.length === 0) {
        res.status(401).send("Points' student not found.");
      } else {
        res.status(200).json(myStudentPoints);
      }
    } catch (error) {
      console.error("Error finding Student:", error.message);
      res.status(401).send("Finding Student failed");
    }
  });

  app.get("/manager/comings/:studentId", async (req, res) => {
    try {

    const studentId = req.params.studentId;

    const myStudentComings = await fetchDataFromTableCondition("Coming", "StudentId", studentId);
      
    if (!myStudentComings || myStudentComings.length === 0) {
        res.status(401).send("Comings' student not found.");
      } else {
        res.status(200).json(myStudentComings);
      }
    } catch (error) {
      console.error("Error finding Student:", error.message);
      res.status(401).send("Finding Student failed");
    }
  });

  module.exports = app;