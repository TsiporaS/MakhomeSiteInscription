var mysql = require('mysql2');

function dropTable(tableName) {
//   var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Moshe26!",
//   port: 3306,
//   database: "makhomedb",
// });

var con = mysql.createConnection({
  host: "mysql-makhome.alwaysdata.net",
  user: "makhome",
  password: "G65*9sK_Sfea3K.",
  port: 3306,
  database: "makhome_db",
});

con.connect(function(err) {
  if (err) throw err;
  var sql = `DROP TABLE ${tableName}`;
  con.query(sql, function (err, result) {
    if (err) {
      console.error(`Could not drop ${tableName} table`, err);
      return;
    }
    console.log(`Table ${tableName} deleted`);
  });
});
}

dropTable("Password");

 //  dropTable("Present");
//  dropTable("Product");

// dropTable("Category");


// dropTable("User");
// dropTable("Cart");


 // dropTable("Business");