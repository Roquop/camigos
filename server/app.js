// Aquí mucha parte viene ya definida por express al usar la query para crear el back.
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var createError = require("http-errors");

// Aquí definimos la enrutación de raíz, donde podemos definir las rutas sobre las cuales definiremos las rutas de los controladores a continuación.
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users"); // Hemos visto como luego dentro de ./routes/users hay /getAllComments, /getOneUser... puede ser un poco lioso, por eso yo en las rutas siempre pongo la dirección completa.
var adminRouter = require("./routes/users/admin");
var associationRouter = require("./routes/association")

var app = express();
app.use(cors({ origin: "*" }));


// view engine setup
// Esto no lo usamos. Express te deja hacer una página "100%" en back, que luego renderiza vistas, pero no es nuestro caso por hacer el front puro con React. Aún así no borro archivos de aquí porque requeriría mucha información, prueba y error y en esta app me he querido centrar en que funcione correctamente, y el código no está optimizado al 100%.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Para cada ruta, debemos hacer un app.use que luego es el que importaremos en las rutas llamando a express.Router()
// Y HASTA AQUÍ LA APP! Espero que me haya explicado correctamente y que se haya visto el trabajo y el esfuerzo.
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/users/admin", adminRouter)
app.use("/association", associationRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
