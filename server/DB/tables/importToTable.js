const { connectToDb } = require("./connectToDB");


function getSheetData() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Préinscription Makhome 2024/2025 (réponses)"); // Remplacez "Sheet1" par le nom de votre feuille
    const dataRange = sheet.getDataRange();
    const sheetData = dataRange.getValues(); // Récupère toutes les données de la feuille
    return sheetData;
  }

  function mapGoogleSheetToSQLColumns(sheetData) {
    const columnMapping = {
        "Prenom": "FirstName",
        "Nom": "LastName",
        "Téléphone": "Phone",
        "Mail": "Email",
        "Code Postal": "Address",
        "Date de naissance": "Birthday",
        "Domaine d'études": "Studies", 
        "Année d'études": "Year", 
        "Lycée fréquenté": "School",
        "Fréquentes-tu une communauté juive? Si oui laquelle?" : "Community",
        "Conditions generales:": "Terms"
        // Continuez à ajouter les colonnes selon votre besoin
      };
  
    const headerRow = sheetData[0]; // La première ligne contient les titres de colonnes
    const dataRows = sheetData.slice(1); // Exclure la première ligne pour obtenir les données
  
    // Trouver les index des colonnes dans la feuille en fonction des noms dans columnMapping
    const columnIndexes = {};
    for (let key in columnMapping) {
      const columnIndex = headerRow.indexOf(key); // Trouve l'index de la colonne correspondant au nom
      if (columnIndex !== -1) {
        columnIndexes[columnMapping[key]] = columnIndex;
      }
    }
  
    // Transformez les données du Google Sheet en fonction du mapping
    const mappedData = dataRows.map(row => {
        return {
          FirstName: row[columnIndexes["Prenom"]],
          LastName: row[columnIndexes["Nom de famille"]],
          Phone: row[columnIndexes["Téléphone"]],
          Email: row[columnIndexes["Mail"]],
          Address: row[columnIndexes["Code postal"]],
          Birthday: row[columnIndexes["Date de naissance"]],
          Studies: row[columnIndexes["Domaine d'études"]],
          Year: row[columnIndexes["Année d'études"]],
          School: row[columnIndexes["Lycée fréquenté"]],
          Community: row[columnIndexes["Fréquentes-tu une communauté juive? Si oui laquelle?"]],
          Terms: row[columnMapping["Conditions générales"]]
          // Autres champs...
        };
      });
  
    return mappedData;
  }
  
  function runMappingAndSendToSQL() {
    const sheetData = getSheetData(); // Récupérer les données de Google Sheets
    const mappedData = mapGoogleSheetToSQLColumns(sheetData); // Mapper les données
    
    // Ensuite, envoyez ces données à votre base de données SQL
    sendToSQL(mappedData);
  }
  


  function sendToSQL(mappedData) {
    // const connection = Jdbc.getConnection("jdbc:mysql://<HOST>:<PORT>/<DATABASE>", "username", "password");
    const connection = connectToDb();

    

    mappedData.forEach(row => {
      const query = `
        INSERT INTO StudentToAccept (FirstName, LastName, Phone, Email, Address, Birthday, Studies, Year, School, Community, Terms)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
      const preparedStatement = connection.prepareStatement(query);
      preparedStatement.setString(1, row.FirstName);
      preparedStatement.setString(2, row.LastName);
      preparedStatement.setString(3, row.Phone);
      preparedStatement.setString(4, row.Email);
      preparedStatement.setString(5, row.Address);
      preparedStatement.setString(6, row.Birthday);
      preparedStatement.setString(7, row.Studies);
      preparedStatement.setString(8, row.Year);
      preparedStatement.setString(9, row.School);
      preparedStatement.setString(10, row.Community);
      preparedStatement.setString(11, row.Terms);
      
      preparedStatement.execute();
    });
    
    connection.close();
  }
  

  runMappingAndSendToSQL();