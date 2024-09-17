const mysql = require("mysql2");
const { connectToDb } = require("../DB/tables/connectToDB");

async function fetchManager(firstName, lastName) {
  return new Promise((resolve, reject) => {
    const con = connectToDb();

    con.connect(function (err) {
      if (err) {
        reject(err); // Rejette la promesse en cas d'erreur de connexion
        return;
      }

      con.query(
        `SELECT * FROM Manager WHERE FirstName = ? AND LastName = ?`,
        [firstName, lastName],
        function (err, result, fields) {
          if (err) {
            console.error(`Error selecting from Manager table`, err);
            con.end(); // Termine la connexion en cas d'erreur
            reject(err);
            return;
          }


          con.end(); // Termine la connexion après la requête réussie
          console.log(result);
          if (result.length === 0) {
            reject(new Error("First Name or Last Name incorrect")); // Rejette si aucune correspondance trouvée
          } else {
            resolve(result[0]); // Renvoie la première ligne du résultat (supposant qu'il n'y a qu'une seule correspondance possible)
          }
        }
      );
    });
  });
};

async function fetchPwdManager(password) {
    return new Promise((resolve, reject) => {
      const con = connectToDb();
  
      con.connect(function (err) {
        if (err) {
          reject(err); // Rejette la promesse en cas d'erreur de connexion
          return;
        }
  
        con.query(
          `SELECT * FROM Password WHERE ManagerId = ?`,
          [password],
          function (err, result, fields) {
            if (err) {
              console.error(`Error selecting from Password table`, err);
              con.end(); // Termine la connexion en cas d'erreur
              reject(err);
              return;
            }
  
  
            con.end(); // Termine la connexion après la requête réussie
            console.log(result);
            if (result.length === 0) {
              reject(new Error("Password incorrect")); // Rejette si aucune correspondance trouvée
            } else {
              resolve(result[0]); // Renvoie la première ligne du résultat (supposant qu'il n'y a qu'une seule correspondance possible)
            }
          }
        );
      });
    });
};

// // Exemple d'utilisation de la fonction fetchUserAndPwd avec async/await
// async function authenticateUser(firstName, lastName, password) {
//   try {
//     console.log("hi");

//     const manager = await fetchManager(firstName, lastName);
//     console.log("Manager authenticated:", manager);
//     const hashedPassword = await fetchPwdManager(managerId);

//     // Comparer le mot de passe fourni avec le mot de passe haché stocké
//     const isMatch = await bcrypt.compare(Password, hashedPassword);

//     if (manager.length === 0)
//     {
//         console.log("Error fetching manager");
//     }
//     if (pwd.length === 0)
//     {
//         console.log("Error fetching password");
//     }

//     if (manager[0].Id !== pwd[0].ManagerId) {
//         console.log("Password incorrect");
//     }  
//     else {
//         return manager;
//     }  
    
//   } catch (error) {
//     console.error("Authentication error:", error.message);
//     throw error; // Renvoie l'erreur pour une gestion ultérieure si nécessaire
//   }
// }

module.exports = { fetchManager, fetchPwdManager };
