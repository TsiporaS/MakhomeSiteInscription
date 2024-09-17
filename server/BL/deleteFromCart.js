var mysql = require("mysql2");
const { connectToDb } = require("../DB/tables/connectToDB");

function deleteFromCart(tableName, line1, condition1, line2, condition2) {
  const con = connectToDb();

  con.connect(function (err) {
    if (err) throw err;

    var sql = `DELETE FROM ${tableName} WHERE ${line1} = '${condition1}' AND ${line2} = '${condition2}'`;
    console.log('sql-------------------------------',sql);
    
    con.query(sql, function (err, result) {
      if (err) {
        console.error(`Could not delete from ${tableName} table`, err);
        return;
      }
      console.log(
        "Number of records deleted: " +
          result.affectedRows +
          `from ${tableName}`
      );
    });
  });
}


 deleteFromCart("Cart", "ProductId", 2, "PresentId", 2);

// deleteFromTable("User", "Id", "12");
module.exports = {deleteFromCart};

