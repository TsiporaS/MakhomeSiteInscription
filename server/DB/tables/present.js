const connectionDB = require("./connectToDB")

var createPresent=
"CREATE TABLE IF NOT EXISTS `Present` (`Id` INT AUTO_INCREMENT NOT NULL, `Date` DATETIME NOT NULL, `ExpirationDate` DATETIME NOT NULL, `MaxPrice` INT NOT NULL, `Category` INT NOT NULL, `UserId` INT NOT NULL, PRIMARY KEY (`Id`), FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`), FOREIGN KEY (`Category`) REFERENCES `Category` (`Id`));";

connectionDB.query(createPresent, function(err, result){
    if (err) throw err;
    console.log("present table created!");
});