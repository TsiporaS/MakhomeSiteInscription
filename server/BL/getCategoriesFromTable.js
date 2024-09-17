var mysql = require("mysql2");
const { connectToDb } = require("../DB/tables/connectToDB");

let readFromTable = async (tableName, line, condition) => {
  return new Promise((resolve, reject) => {
    const con = connectToDb();

    con.connect(function (err) {
      if (err) {
        reject(err); // Rejette la promesse en cas d'erreur de connexion
        return;
      }

      //   const sqlQuery = `SELECT * FROM ${tableName} WHERE ${line} = '${condition}'`;

      let sqlQuery;
      let values;

      // Check if condition is an array (multiple conditions)
      if (Array.isArray(condition)) {
        const placeholders = condition.map(() => "?").join(", ");
        sqlQuery = `SELECT * FROM ${tableName} WHERE ${line} IN (${placeholders})`;
        values = condition; // Pass the array of conditions as the values
      } else {
        // Single condition
        sqlQuery = `SELECT * FROM ${tableName} WHERE ${line} = ?`;
        values = [condition]; // Wrap single condition in an array
        // console.log("values", values);
      }

      console.log("Executing query:", sqlQuery);
      con.query(sqlQuery, values, function (err, result, fields) {
        if (err) {
          console.error(`Could not select from ${tableName} table`, err);
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

async function getCategoriesFromTable(tableName, line, condition) {
  try {
    const data = await readFromTable(tableName, line, condition);
    // console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// async function fetchDataFromTableCondition(tableName, columnName, values) {
//   const placeholders = values.map(() => "?").join(", ");
//   const sqlQuery = `SELECT * FROM ${tableName} WHERE ${columnName} IN (${placeholders})`;
//   return await executeQuery(sqlQuery, values);
// }

module.exports = { getCategoriesFromTable };






