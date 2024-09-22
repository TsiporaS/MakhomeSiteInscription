var mysql = require('mysql2');
const { connectToDb } = require('../DB/tables/connectToDB');

function updateTable(studentId){
  const con = connectToDb();

con.connect(function(err) {
  if (err) throw err;
  //var sql = `UPDATE users SET phone = 'Canyon 123' WHERE address = 'Valley 345'`;
  var sql = `UPDATE Point SET Points = Points + 1 WHERE StudentId = ${studentId}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated in Point" );
  });
});
}


module.exports = {updateTable};

// updateTable("Point", "Points = Points + 1", `StudentId = '${student[0].Id}'`);
///updateTable("users", "phone = '0546789567' WHERE id = 3" );
// updateTable("Students", "age = 5", "name = 'Moshe'" );


