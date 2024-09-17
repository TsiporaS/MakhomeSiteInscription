var mysql = require("mysql2");
const { connectToDb } = require("../DB/tables/connectToDB");

function deleteFromTable(tableName, line, condition) {
  const con = connectToDb();

  con.connect(function (err) {
    if (err) throw err;

    var sql = `DELETE FROM ${tableName} WHERE ${line} = '${condition}'`;
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


// deleteFromTable("Students", "name", "Itshak");

// deleteFromTable("User", "Id", "12");
//=======
// deleteFromTable("Cart", "Id", "6");


module.exports = { deleteFromTable };
