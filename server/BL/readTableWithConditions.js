var mysql = require("mysql2");
const { connectToDb } = require("../DB/tables/connectToDB");

let readFromTable = async (tableName, columns, conditions) => {
    return new Promise((resolve, reject) => {
      const con = connectToDb();
  
      con.connect(function (err) {
        if (err) {
          reject(err);
          return;
        }
  
        // Build the WHERE clause for multiple conditions
        const whereClause = columns.map((column, index) => `${column} = ?`).join(" AND ");
        const sqlQuery = `SELECT * FROM ${tableName} WHERE ${whereClause}`;
  
        console.log("Executing query:", sqlQuery);
        con.query(sqlQuery, conditions, function (err, result, fields) {
          if (err) {
            console.error(`Could not select from ${tableName} table`, err);
            reject(err);
            return;
          }
          con.end();
          console.log("Query result:", result);
          resolve(result);
        });
      });
    });
  };
  
  
  
  async function fetchDataFromTableConditions(tableName, columns, conditions) {
    try {
      const data = await readFromTable(tableName, columns, conditions);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  
  module.exports = { fetchDataFromTableConditions };
  