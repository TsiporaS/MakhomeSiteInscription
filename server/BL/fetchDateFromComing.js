var mysql = require("mysql2");
const { connectToDb } = require("../DB/tables/connectToDB");

let readFromTable = async (student, date) => {
  return new Promise((resolve, reject) => {
    const con = connectToDb();

    con.connect(function (err) {
      if (err) {
        reject(err); // Rejette la promesse en cas d'erreur de connexion
        return;
      }
      // con.query(`SELECT * FROM ${tableName} WHERE ${line} = '${condition}'`, function (err, result, fields) {
      const sqlQuery = `SELECT COUNT(*) AS count FROM Coming WHERE StudentId = '${student}' AND Date >= '${date}'`
    //   const sqlQuery = `SELECT * FROM Coming WHERE StudentId = '${student}' AND Date = '${date}' `;
      console.log("Executing query:", sqlQuery);
      con.query(sqlQuery, function (err, result, fields) {
        if (err) {
          console.error(`Could not select from Coming table`, err);
          reject(err);

          return;
        }
        con.end(); // Termine la connexion après la requête réussie
        console.log("Query result:", result);
        resolve(result);
        //console.log(result);
        //console.log(fields);
      });
    });
  });
};


async function fetchDateFromComing(student, date) {
    try {
        const data = await readFromTable(student, date);
        // console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
  }





module.exports = { fetchDateFromComing };
