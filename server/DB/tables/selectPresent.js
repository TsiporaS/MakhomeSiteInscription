const connectionDB = require("./connectToDB")

var createSelectPresent=
// "CREATE TABLE IF NOT EXISTS `SelectPresent` (`Id` INT AUTO_INCREMENT NOT NULL,`PresentId` INT NOT NULL,`ProductId` INT NOT NULL,`Amount` INT NOT NULL,PRIMARY KEY (`Id`), FOREIGN KEY (`PresentId`) REFERENCES `Present` (`Id`), FOREIGN KEY (`ProductId`) REFERENCES `Products` (`Id`));";
"CREATE TABLE IF NOT EXISTS `SelectPresent` (`Id` INT AUTO_INCREMENT NOT NULL,`PresentId` INT NOT NULL,`CartId` INT NOT NULL,`Price` INT NOT NULL,PRIMARY KEY (`Id`), FOREIGN KEY (`PresentId`) REFERENCES `Present` (`Id`), FOREIGN KEY (`CartId`) REFERENCES `Cart` (`Id`));";

connectionDB.query(createSelectPresent, function(err, result){
    if (err) throw err;
    console.log("selectPresent table created!");
});