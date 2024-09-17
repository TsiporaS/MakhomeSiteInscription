const mysql = require('mysql2/promise');

async function alterTable(tableName, colonneName, modification) {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root", // Votre nom d'utilisateur MySQL
    password: "Ofakim123?", // Votre mot de passe MySQL
    database: "presentDB" // Votre nom de base de données MySQL
  });

  try {
    // Requête SQL pour modifier le type de données de la colonne 'phone' dans la table 'users'
    const sql = `
      ALTER TABLE ${tableName}
      MODIFY ${colonneName} ${modification}`;

    await con.execute(sql);
    console.log(`La colonne ${colonneName} a été modifiée avec succès.`);
  } catch (error) {
    console.error(`Erreur lors de la modification de la colonne ${colonneName}:`, error);
  } finally {
    await con.end();
  }
}

// Appel de la fonction pour modifier la colonne 'phone'
alterTable("Present", "MaxPrice", "NVARCHAR(50)");
alterTable("Product", "Price", "NVARCHAR(50)");
alterTable("Cart", "Price", "NVARCHAR(50)");
