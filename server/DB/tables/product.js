var mysql = require("mysql2");
// const { connectToDb } = require('../DB/tables/connectToDB');
// const img= require('../DATA/בגדים/')
const { connectToDb } = require("../tables/connectToDB");

const connection = connectToDb();

const sqlStatements = [
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('Sets for childrenBBBB', 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/538497/05/fnd/DFA/fmt/png/MAPF1-%D7%A1%D7%98-%D7%91%D7%92%D7%93%D7%99%D7%9D-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D', '5','1', '18', 'descreption')",
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('סט בגדים סוושירט וטייץ', 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/538497/05/fnd/DFA/fmt/png/MAPF1-%D7%A1%D7%98-%D7%91%D7%92%D7%93%D7%99%D7%9D-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D', '5','1', '31.96', 'descreption')",
  
  
  "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('נחש מי', 'https://www.kodkod.co.il/images/itempics/1759_13072023112506_small.jpg?20230718164008', '3','1', '30', 'Board games')",
  "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('בול פגיעה', 'https://www.plastelina-ltd.co.il/images/itempics/727565020341_26072022164650_large.jpg', '3','1', '49.90', 'Board games')",
  "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('Rummikub', 'https://www.mylist.co.il/wp-content/uploads/2023/06/%D7%A8%D7%9E%D7%99%D7%A7%D7%95%D7%91.jpg', '3','1', '49.90', 'Board games')",
  "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('Monopoly', 'https://toysale.co.il/wp-content/uploads/2021/07/1937_151120180853311.jpg', '3','1', '60', 'Board games')",
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('בול פגיעה', 'https://www.plastelina-ltd.co.il/images/itempics/727565020341_26072022164650_large.jpg', '3','1', '49.90', 'Board games')",
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('בול פגיעה', 'https://www.plastelina-ltd.co.il/images/itempics/727565020341_26072022164650_large.jpg', '3','1', '49.90', 'Board games')",
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('בול פגיעה', 'https://www.plastelina-ltd.co.il/images/itempics/727565020341_26072022164650_large.jpg', '3','1', '49.90', 'Board games')",
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('בול פגיעה', 'https://www.plastelina-ltd.co.il/images/itempics/727565020341_26072022164650_large.jpg', '3','1', '49.90', 'Board games')",

  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('Sets for childrenBBBB', 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/538497/05/fnd/DFA/fmt/png/MAPF1-%D7%A1%D7%98-%D7%91%D7%92%D7%93%D7%99%D7%9D-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D', '5','1', '18', 'descreption')",
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('Sets for childrenBBBB', 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/538497/05/fnd/DFA/fmt/png/MAPF1-%D7%A1%D7%98-%D7%91%D7%92%D7%93%D7%99%D7%9D-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D', '5','1', '18', 'descreption')",
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('Sets for childrenBBBB', 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/538497/05/fnd/DFA/fmt/png/MAPF1-%D7%A1%D7%98-%D7%91%D7%92%D7%93%D7%99%D7%9D-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D', '5','1', '18', 'descreption')",
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('Sets for childrenBBBB', 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/538497/05/fnd/DFA/fmt/png/MAPF1-%D7%A1%D7%98-%D7%91%D7%92%D7%93%D7%99%D7%9D-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D', '5','1', '18', 'descreption')",
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('Sets for childrenBBBB', 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/538497/05/fnd/DFA/fmt/png/MAPF1-%D7%A1%D7%98-%D7%91%D7%92%D7%93%D7%99%D7%9D-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D', '5','1', '18', 'descreption')",
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('Sets for childrenBBBB', 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/538497/05/fnd/DFA/fmt/png/MAPF1-%D7%A1%D7%98-%D7%91%D7%92%D7%93%D7%99%D7%9D-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D', '5','1', '18', 'descreption')",
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('Sets for childrenBBBB', 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/538497/05/fnd/DFA/fmt/png/MAPF1-%D7%A1%D7%98-%D7%91%D7%92%D7%93%D7%99%D7%9D-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D', '5','1', '18', 'descreption')",
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('Sets for childrenBBBB', 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/538497/05/fnd/DFA/fmt/png/MAPF1-%D7%A1%D7%98-%D7%91%D7%92%D7%93%D7%99%D7%9D-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D', '5','1', '18', 'descreption')",
  // "INSERT INTO Product ( Name, Image, Category, BusinessId, Price, Description ) VALUES ('Sets for childrenBBBB', 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/538497/05/fnd/DFA/fmt/png/MAPF1-%D7%A1%D7%98-%D7%91%D7%92%D7%93%D7%99%D7%9D-%D7%9C%D7%99%D7%9C%D7%93%D7%99%D7%9D', '5','1', '18', 'descreption')",

];

sqlStatements.forEach((sql) => {
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("inserted!");
  });
});

connection.end((err) => {
  if (err) throw err;
  console.log("Connection closed");
});

// sqlStatements.forEach((sql) => {
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("inserted!");
//   });
// });

// var mysql = require('mysql2');
// const { connectToDb } = require('../DB/tables/connectToDB');

// const sqlStatements = [

//   "INSERT INTO Product ( Name, Image, Category, BusinessId, Price) VALUES ('Jewlery')",
//   'INSERT INTO category ( Name) VALUES ("Toys")',
//   'INSERT INTO category ( Name) VALUES ("Decorations")',
//   'INSERT INTO category ( Name) VALUES ("Clothing")'

//      ];

//     sqlStatements.forEach((sql) => {
//       connection.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log("inserted!");
//       });
//     });
