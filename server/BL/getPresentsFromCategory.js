var mysql = require('mysql2');
const { fetchDataFromTableCondition } = require("../BL/selectCondition");
const { connectToDb } = require('../DB/tables/connectToDB');

let getProductsFromCategory = async (category) => {
    return new Promise((resolve, reject) => {
        const con = connectToDb();

        const categ = fetchDataFromTableCondition("Category", "name", `${category}`);

        con.connect(function (err) {
            if (err) {
                reject(err); // Rejette la promesse en cas d'erreur de connexion
                return;
            }
            con.query(`SELECT * FROM Products WHERE Category = '${categ.Id}'`, function (err, result, fields) {
                if (err) {
                    console.error(`Could not select products this category`, err);
                    return;
                }
                con.end(); // Termine la connexion après la requête réussie
                resolve(result);
                //console.log(result);
                //console.log(fields);
            });
        });
    });
}





module.exports = { getProductsFromCategory }