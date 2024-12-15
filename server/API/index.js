const fs = require('fs');
const axios = require('axios');
const publicIp = require('public-ip');
const config = require('./config.json');

// Fonction pour obtenir l'adresse IP publique
async function getPublicIp() {
  try {
    const ip = await publicIp.v4();
    return ip;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'adresse IP:', error);
    throw error;
  }
}

// Fonction pour sauvegarder le fichier sur OneDrive
async function saveFileToOneDrive(filePath, content) {
  try {
    const accessToken = 'YOUR_ACCESS_TOKEN'; // Remplacez par votre token d'accès OneDrive
    const uploadUrl = https://graph.microsoft.com/v1.0/me/drive/root:/${filePath}:/content;

    const response = await axios.put(uploadUrl, content, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'text/plain'
      }
    });

    console.log('Fichier sauvegardé avec succès sur OneDrive:', response.data);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du fichier sur OneDrive:', error);
    throw error;
  }
}

// Fonction principale
async function main() {
  try {
    const ip = await getPublicIp();
    const filePath = config.oneDriveFilePath;
    await saveFileToOneDrive(filePath, ip);
  } catch (error) {
    console.error('Erreur dans le service:', error);
  }
}

// Exécuter la fonction principale
main();