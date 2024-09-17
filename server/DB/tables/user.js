var mysql = require("mysql2");
const { connectToDb } = require("../tables/connectToDB");

const connection = connectToDb();

// Your further code that uses the `connection` variable

const sqlStatements = [
  "INSERT INTO User ( Mail, Password) VALUES ('hb05@gmail.com', '125')",
];

sqlStatements.forEach((sql) => {
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("inserted!");
  });
});

connection.end((err) => {
  if (err) throw err;
  console.log("Connection closed");
});
