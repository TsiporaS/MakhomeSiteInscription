var mysql = require('mysql2');

function deleteFromTable(tableName, line, condition){
    var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ofakim123?",
  database: "userDB"
});

con.connect(function(err) {
  if (err) throw err;
  //var sql = "DELETE FROM Students WHERE name = 'Ora'";
  var sql = `DELETE FROM ${tableName} WHERE ${line} = '${condition}'`;
  con.query(sql, function (err, result) {
    if (err) {
        console.error(`Could not delete from ${tableName} table`, err);
        return;
      }
    console.log("Number of records deleted: " + result.affectedRows + `from ${tableName}`);
  });
});
}

deleteFromTable("Students", "name", "Itshak");

module.exports = {deleteFromTable};

