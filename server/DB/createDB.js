// const { use } = require("express/lib/application");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Moshe26!",
  port: 3306,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query("CREATE DATABASE makhomeDB", function (err, result) {
    if (err) throw err;
    console.log("makhomeDB database created!");
  });
});
