//Aquí Configuramos la conexión con nuestro mysql workbench
//Requerimos la librería y el archivo .env de la librería dotenv
var mysql = require("mysql2"); //Requerimos la librería mysql
require("dotenv").config();

//creamos la conexión según los datos del archivo, pero especificamos el puerto concreto de la base de datos ya que no será el mismo que el del dotenv. Para saber qué poner, la página de la base de datos me dio toda la información.
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 27901
});

// console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME )
connection.connect((error) => {
  if (error) {
    throw error;
  } else {
    //este console log lo dejo porque es el que me permite ver si la conexión con la base de datos se realiza correctamente
    console.log("Conexión correcta");
  }
});

//Esta era otra prueba
// connection.connect();
// connection.query('SELECT * from prueba', function(err,rows,fields){
//   if(err) console.log(err);
//   console.log('the solution is', rows);
//   connection.end();
// })


module.exports = connection;
