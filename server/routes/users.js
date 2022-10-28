/* En este archivo definiremos las rutas relacionadas a la tabla 'users' de la B.D */

const express = require('express'); // Importando 'Express'

const router = express.Router(); // Para definir las rutas al poder acceder a los métodos HTTP

const controller = require('../controllers/users'); // Importando el controller


/* Definiendo las rutas */



// Importando este módulo de las rutas
module.exports = router;