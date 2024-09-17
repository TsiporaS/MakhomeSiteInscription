// const mysql = require('mysql2/promise');
// const pool = require('../db'); // Adjust this path according to your project structure
const { connectToDb } = require("../DB/tables/connectToDB");

/**
 * Fetch data from a table using JOIN.
 * @param {string} mainTable - The main table to fetch data from.
 * @param {string} joinTable - The table to join with the main table.
 * @param {string} mainTableKey - The key in the main table for the join.
 * @param {string} joinTableKey - The key in the join table for the join.
 * @param {string} conditionField - The field for the WHERE condition.
 * @param {string | number} conditionValue - The value for the WHERE condition.
 * @returns {Promise<Array>} The resulting data from the query.
 */
async function fetchDataWithJoin(
  mainTable,
  joinTable,
  mainTableKey,
  joinTableKey,
  conditionField,
  conditionValue
) {
  try {
    const connection = connectToDb();

    const query = `
          SELECT * 
            FROM ${mainTable}
            INNER JOIN ${joinTable} 
            ON ${mainTableKey} = ${joinTableKey}
            WHERE ${conditionField} = ?`;
    const [rows] = await connection.promise().query(query, [conditionValue]);

    connection.end();

    return rows;
  } catch (error) {
    console.error("Error fetching data with join:", error);
    throw error;
  }
}

module.exports = { fetchDataWithJoin };
