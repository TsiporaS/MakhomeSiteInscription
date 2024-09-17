
const { Router } = require("express");
const app = Router();
const bodyParser = require("body-parser");
const { authenticateUser } = require("../BL/fetchUserAndPwd");
const { fetchDataFromTableCondition } = require("../BL/selectCondition");
const { fetchDataWithManyConditions } = require("../BL/fetchDataWithManyConditions");
const { fetchDataFromTable } = require("../BL/readTable");
const { deleteFromTable } = require("../BL/deleteFromTable")
const jwt = require("jsonwebtoken");

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
      const manager = await authenticateUser(LastName, FirstName, Password);

      if (manager) {
        const token = jwt.sign({ id: manager.Id, firstName: manager.FirstName, lastName: manager.LastName  }, secretKey, {
          expiresIn: "1h",
        });
        console.log("Manager authenticated:", manager);
        // res.json({ message: 'Login successful' });
  
        res.status(200).json({ token, managerId: manager.Id });
        // console.log('res.status()', res.status());
        // res.status(200).send(user);
      } else {
        console.log("Authentication failed for user:", FirstName + LastName);
        res.status(401).json({ message: "Authentication failed" });
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/manager/signup", async (req, res) => {
    const { FirstName, LastName, Password } = req.body;
  
    try {

      const myManager = await fetchDataWithManyConditions("Manager", "FirstName", FirstName, "LastName", LastName);
  
      console.log("myManager", myManager);
      console.log("myManager.length", myManager.length);
      if (myManager.length == 0) {
        const parameters = [FirstName, LastName];
        await insertToTable("Manager", "FirstName, LastName", parameters);

        const thisManager = await fetchDataWithManyConditions("Manager", "FirstName", FirstName, "LastName", LastName);
        const managerId = thisManager[0].Id;

        await insertToTable("Password", "ManagerId, Password", `'${managerId}', '${Password}`);
  
        // Generate the token
        const token = jwt.sign({ id: manager.Id, firstName: manager.FirstName, lastName: manager.LastName }, secretKey, {
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
  
  app.get("/user/:name", authenticateToken, async (req, res) => {
    try {
      const userName = req.params.name;
      // console.log('userName', userName);
      const user = await fetchDataFromTableCondition("User", "Mail", userName);
      if (!user || user.length === 0) {
        res.status(401).send("User not found.");
      } else {
        const userId = user[0].Id;
        // console.log("userId", userId);
        // res.status(200).json({ message: user[0].Id });
        res.status(200).json({ message: userId });
      }
    } catch (error) {
      console.error("Error finding user:", error.message);
      res.status(401).send("Finding User failed");
    }
  });

  app.get("/manager/students/peinscription", async (req, res) => {
    try {
      
      const studentsToAccept = await fetchDataFromTable("StudentsToAccept");
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

    const myStudent = await fetchDataFromTableCondition("StudentsToAccept", "Id", studentId);
      
    if (!myStudent || myStudent.length === 0) {
        res.status(401).send("Students not found.");
      } else {
        res.status(200).json({ myStudent: myStudent });
      }
    } catch (error) {
      console.error("Error finding Student:", error.message);
      res.status(401).send("Finding Student failed");
    }
  });

  app.post("/manager/student/:studentId/accept", async (req, res) => {

    const params = req.body.parameters;

const fields = [
  'FirstName', 'LastName', 'Phone', 'Email', 'Birthday', 
  'Country', 'City', 'Road',  
  'School', 'Studies', 'Year', 'Community', 
  'ParentFirstName', 'ParentLastName', 'ParentPhone',
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

    if (res.status(200)) {
        await deleteFromTable("StudentToAccept", "Email", fieldValues[3]);
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
      
      const allstudents = await fetchDataFromTable("Students");
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

    const myStudent = await fetchDataFromTableCondition("Students", "Id", studentId);
      
    if (!myStudent || myStudent.length === 0) {
        res.status(401).send("Students not found.");
      } else {
        res.status(200).json({ myStudent: myStudent });
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

  module.exports = app;