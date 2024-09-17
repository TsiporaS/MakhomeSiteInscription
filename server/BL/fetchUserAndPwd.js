const mysql = require("mysql2");
const { connectToDb } = require("../DB/tables/connectToDB");

let fetchUserAndPwd = async (username, password) => {
  return new Promise((resolve, reject) => {
    const con = connectToDb();

    con.connect(function (err) {
      if (err) {
        reject(err); // Rejette la promesse en cas d'erreur de connexion
        return;
      }

      con.query(
        `SELECT * FROM User WHERE Mail = ? AND Password = ?`,
        [username, password],
        function (err, result, fields) {
          if (err) {
            console.error(`Error selecting from User table`, err);
            con.end(); // Termine la connexion en cas d'erreur
            reject(err);
            return;
          }

          con.end(); // Termine la connexion après la requête réussie
          console.log(result);
          if (result.length === 0) {
            reject(new Error("Username or password incorrect")); // Rejette si aucune correspondance trouvée
          } else {
            resolve(result[0]); // Renvoie la première ligne du résultat (supposant qu'il n'y a qu'une seule correspondance possible)
          }
        }
      );
    });
  });
};

// Exemple d'utilisation de la fonction fetchUserAndPwd avec async/await
async function authenticateUser(username, password) {
  try {
    console.log("hi");

    const user = await fetchUserAndPwd(username, password);
    console.log("User authenticated:", user);
    return user;
  } catch (error) {
    console.error("Authentication error:", error.message);
    throw error; // Renvoie l'erreur pour une gestion ultérieure si nécessaire
  }
}

module.exports = { authenticateUser };