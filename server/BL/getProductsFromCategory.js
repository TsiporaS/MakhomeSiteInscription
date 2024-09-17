var mysql = require("mysql2");
const { fetchDataFromTableCondition } = require("../BL/selectCondition");
const { connectToDb } = require("../DB/tables/connectToDB");

let readFromTable = async (tableName, line, condition) => {
  return new Promise((resolve, reject) => {
    const con = connectToDb();

    con.connect(function (err) {
      if (err) {
        reject(err); 
        return;
      }

       // Handle the condition if it's an array (for multiple categories)
       let queryCondition;
       if (Array.isArray(condition)) {
         queryCondition = `${line} IN (${condition.map(c => `'${c}'`).join(", ")})`;
       } else {
         queryCondition = `${line} = '${condition}'`;
       }
 
       const query = `SELECT * FROM ${tableName} WHERE ${queryCondition}`;

      //  const query = `SELECT * FROM ${tableName} WHERE ${queryCondition}`;
      con.query(
        query,
        // `SELECT * FROM ${tableName} WHERE ${line} = '${condition}'`,
        function (err, result) {
          if (err) {
            console.error(`Could not select from ${tableName} table`, err);
            return;
          }
          con.end(); // Termine la connexion après la requête réussie
          resolve(result);
          //console.log(result);
          //console.log(fields);
        }
      );
    });
  });
};

async function getProductsFromCategory(category) {
  try {
    console.log("category:", category);

    const data = await readFromTable("Product", "Category", category);
    console.log("data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

module.exports = { getProductsFromCategory };
