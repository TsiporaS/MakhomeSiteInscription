// const { use } = require("express/lib/application");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "mysql-makhome.alwaysdata.net",
  user: "makhome",
  password: "G65*9sK_Sfea3K.",
  port: 3306,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  // connection.query("ALTER DATABASE makhome_db")
  connection.query("CREATE DATABASE makhome_db", function (err, result) {
    if (err) throw err;
    console.log("makhome_db database created!");
  });
});
