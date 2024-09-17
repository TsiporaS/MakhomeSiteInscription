const mysql = require("mysql2");

const connectToDb = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Moshe26!",
    port: 3306,
    database: "makhomedb",
  });

  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to makhomeDB successfully!");
  });

  return connection;
};

module.exports = { connectToDb };



// // const { use } = require("express/lib/application");
// const mysql = require("mysql2");

// const connectToDb = () => {
//   connectionDB = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Ofakim123?",
//   database: "presentDB",
// });
// // const connectionDB = mysql.createConnection({
// //   host: "localhost",
// //   user: "root",
// //   password: "Ofakim123?",
// //   database: "presentDB",
// // });


// connectionDB.connect(function (err) {
//     if (err) throw err;
//   console.log("Connected to mydb successfully!");
// });
// return connectionDB;
// }


// const connectionDB = () => 
//   {
//     mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Ofakim123?",
//   database: "presentDB",
// });

// connectionDB.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected to presentDB successfully!");
// });
//   }

module.exports= {connectToDb };