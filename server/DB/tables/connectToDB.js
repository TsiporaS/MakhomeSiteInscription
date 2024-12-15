const mysql = require("mysql2");

const connectToDb = () => {
  // const connection = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "Moshe26!",
  //   port: 3306,
  //   database: "makhomedb",
  // });

  const connection = mysql.createConnection({
    host: "mysql-makhome.alwaysdata.net",
    user: "makhome",
    password: "G65*9sK_Sfea3K.",
    port: 3306,
    database: "makhome_db",
  });
// console.log("connection info : " + connection.user  + ", pw: " + connection.password);
// console.log("trying to connect.");
  connection.connect(function (err) {
    if (err) {
      console.error("error in connect",err);
      throw err;
    }
    console.log("Connected to makhome_db successfully!");
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