var mysql = require('mysql2');
const { connectToDb } = require('../DB/tables/connectToDB');

let readFromTable = async (tableName) => {
    return new Promise((resolve, reject) => {
        const con = connectToDb();

        con.connect(function (err) {
            if (err) {
                reject(err); // Rejette la promesse en cas d'erreur de connexion
                return;
            }
            con.query(`SELECT * FROM ${tableName}`, function (err, result, fields) {
                if (err) {
                    console.error(`Could not select from ${tableName} table`, err);
                    return;
                }
                con.end(); // Termine la connexion après la requête réussie
                resolve(result);
                console.log(result);
                //console.log(fields);
            });
        });
    });
}

// Exemple d'utilisation de la fonction readFromTable avec async/await
async function fetchDataFromTable(tableName) {
    try {
        // console.log('5555');

        const data = await readFromTable(tableName);
        console.log('data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// fetchDataFromTable("Students"); // Appel de la fonction pour récupérer les données



// readFromTable("Cart");
//console.log('readFromTable', readFromTable);
//console.log('fetchDataFromTable', fetchDataFromTable);

module.exports = { fetchDataFromTable }