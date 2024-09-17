var mysql = require('mysql2');

function insertToTable(tableName, parameters, columns){
    var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ofakim123?",
  database: "userDB"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `INSERT INTO ${tableName} (${parameters}) VALUES (${columns})`;
  con.query(sql, function (err, result) {
    if (err) {
        console.error(`Could not insert into ${tableName} table`, err);
        return;
      }
    console.log(`1 record inserted to ${tableName}`);
  });
});
}

insertToTable("Students", "name, age", "'Itshak', '8'");

module.exports = {insertToTable};