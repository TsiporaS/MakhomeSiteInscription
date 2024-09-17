function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    
    return result;
  }
  
  // Utilisation - Génère un code de 10 caractères aléatoires
//   const randomCode = generateRandomCode(10);
//   console.log(randomCode);

  module.exports = { generateRandomCode }
  