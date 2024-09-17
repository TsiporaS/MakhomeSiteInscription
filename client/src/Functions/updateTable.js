var mysql = require('mysql2');

function updateTable(tableName, element, condition){
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ofakim123?",
  database: "userDB"
});

con.connect(function(err) {
  if (err) throw err;
  //var sql = `UPDATE users SET phone = 'Canyon 123' WHERE address = 'Valley 345'`;
  var sql = `UPDATE ${tableName} SET ${element} WHERE ${condition}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated in " + tableName);
  });
});
}
module.exports = {updateTable};
///updateTable("users", "phone = '0546789567' WHERE id = 3" );
updateTable("Students", "age = 5", "name = 'Moshe'" );


