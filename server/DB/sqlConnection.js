// SQLConnection.js

const { use } = require("express/lib/application");
const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Moshe26!",
//   port: 3306,
//   database: "makhomeDB",
// });

const connection = mysql.createConnection({
  host: "mysql-makhome.alwaysdata.net",
  user: "makhome",
  password: "G65*9sK_Sfea3K.",
  port: 3306,
  database: "makhome_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL");
    return;
  }
  console.log("Connected!");
});

const sqlStatements = [

//  "CREATE TABLE IF NOT EXISTS `Student` (`Id` INT AUTO_INCREMENT NOT NULL, `Barcode` NVARCHAR(50) NOT NULL, `FisrtName` NVARCHAR(20) NOT NULL, `LastName` NVARCHAR(50) NOT NULL, `Phone` CHAR(10) NOT NULL, `Email` NVARCHAR(50) NOT NULL, `City` NVARCHAR(50) NOT NULL, `Country` NVARCHAR(50) NOT NULL, `PostalCode` NVARCHAR(50) NOT NULL, `Road` NVARCHAR(50) NOT NULL, `Birthday` DATETIME NOT NULL, `School` NVARCHAR(50) NOT NULL, `Studies` NVARCHAR(50) NOT NULL, `Year` NVARCHAR(50) NOT NULL, `Community` NVARCHAR(50), `ParentFirstName` NVARCHAR(50), `ParentLastName` NVARCHAR(50), `ParentPhone` NVARCHAR(50), PRIMARY KEY (`Id`)) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;",
 "CREATE TABLE IF NOT EXISTS `Password` (`ManagerId` INT NOT NULL, `Password` NVARCHAR(255) NOT NULL, PRIMARY KEY (`ManagerId`), FOREIGN KEY (`ManagerId`) REFERENCES `Manager` (`Id`));",
//  "CREATE TABLE IF NOT EXISTS `Point` (`Id` INT AUTO_INCREMENT NOT NULL, `StudentId` INT NOT NULL, `Points` INT NOT NULL, PRIMARY KEY (`Id`), FOREIGN KEY (`StudentId`) REFERENCES `Student` (`Id`));",
//   "CREATE TABLE IF NOT EXISTS `Manager` (`Id` INT AUTO_INCREMENT NOT NULL, `FirstName` NVARCHAR(50) NOT NULL, `LastName` NVARCHAR(50) NOT NULL, `Email` NVARCHAR(50) NOT NULL, PRIMARY KEY (`Id`));",
//  "CREATE TABLE IF NOT EXISTS `StudentToAccept` (`Id` INT AUTO_INCREMENT NOT NULL, `FisrtName` NVARCHAR(20) NOT NULL, `LastName` NVARCHAR(50) NOT NULL, `Phone` CHAR(10) NOT NULL, `Email` NVARCHAR(50) NOT NULL, `Adress` NVARCHAR(100) NOT NULL, `Birthday` DATETIME NOT NULL, `Studies` NVARCHAR(50) NOT NULL, `Year` NVARCHAR(50) NOT NULL, `School` NVARCHAR(50) NOT NULL, `Community` NVARCHAR(50), `Terms` NVARCHAR(555), PRIMARY KEY (`Id`)) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;",

//  "CREATE TABLE IF NOT EXISTS `Coming` (`Id` INT AUTO_INCREMENT NOT NULL, `StudentId` INT NOT NULL, `Date` DATETIME NOT NULL, `Reason` NVARCHAR(255) NOT NULL, PRIMARY KEY (`Id`), FOREIGN KEY (`StudentId`) REFERENCES `Student` (`Id`));",


 ];

sqlStatements.forEach((sql) => {
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });
});
