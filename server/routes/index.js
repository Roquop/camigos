var express = require('express');
var router = express.Router();

/* GET home page. */
// Este es el archivo inicial que trae express, que he preferido tampoco borrar.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
