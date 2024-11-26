// utils/dateUtils.js
const getLocalizedDate = (date, timeZone = 'Europe/Paris') => {
    return new Date(
      date.toLocaleString('en-US', { timeZone })
    );
  };
  
  module.exports = { getLocalizedDate };