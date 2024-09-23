var mysql = require('mysql2');

function dropTable(tableName) {
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Moshe26!",
  port: 3306,
  database: "makhomedb",
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

dropTable("Coming");

 //  dropTable("Present");
//  dropTable("Product");

// dropTable("Category");


// dropTable("User");
// dropTable("Cart");


 // dropTable("Business");