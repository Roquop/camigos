var mysql = require("mysql2"); //Requerimos la librería mysql
require("dotenv").config();
//Configuración de la conexión con nuestro mysql workbench
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 27901
});

console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME )
connection.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("Conexión correcta");
  }
});

// connection.connect();
// connection.query('SELECT * from prueba', function(err,rows,fields){
//   if(err) console.log(err);
//   console.log('the solution is', rows);
//   connection.end();
// })


module.exports = connection;
