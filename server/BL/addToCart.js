
      
var mysql = require('mysql2');
const { fetchDataFromTableCondition } = require("../BL/selectCondition");
const { connectToDb } = require('../DB/tables/connectToDB');

let addToCart = async (product, presentId) => {
    return new Promise((resolve, reject) => {
        const con = connectToDb();

        const selectPresent = fetchDataFromTableCondition("SelectPresent", "PresentId", `${presentId}`);
        if(selectPresent.Price > product.price) {
        con.connect(function (err) {
            if (err) {
                reject(err); // Rejette la promesse en cas d'erreur de connexion
                return;
            }
            con.query(`INSERT INTO Cart (ProductId, ProductName, Amount, Price), VALUES (${product.id}, ${product.name}, ${product.amount}, ${product.price})`,function (err, result, fields) {
                if (err) {
                    console.error(`Could not insert product`, err);
                    return;
                }
                con.end(); // Termine la connexion après la requête réussie
                resolve(result);
                //console.log(result);
                //console.log(fields);
            });
        });
       }
       else {
        con.status(401).send("You don't have money");
       }
    });
}





module.exports = { getProductsFromCategory }