var mysql = require("mysql2");
const { connectToDb } = require("../DB/tables/connectToDB");

function insertToTable(tableName, columns, parameters) {
  const con = connectToDb();
  // console.log('8888888888888888888');

  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) throw err;
      // console.log("Connected!");
      console.log(
        "tableName",
        tableName,
        "columns",
        columns,
        "parameters",
        parameters
      );

      const placeholders = parameters.map(() => "?").join(", ");

      // const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${parameters.map(() => '?').join(', ')})`;
      const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

      // var sql = `INSERT INTO ${tableName} (${columns}) VALUES (${parameters})`;
      console.log("new sql", sql);
      con.query(sql, parameters, function (err, result) {
        if (err) {
          console.error(`Could not insert into ${tableName} table`, err);
          return reject(err);
        }
        console.log(`1 record inserted to ${tableName}: ${parameters}`);
        resolve(result);
      });
    });
  });
}

module.exports = { insertToTable };

// const parameters = [2, 5];
// insertToTable("Point", "StudentId, Points", parameters);

const now = new Date();
const parameters = [2, now, "Cafeteria"];
insertToTable("Coming", "StudentId, Date, Reason", parameters);
