/* En este archivo definiremos las rutas relacionadas al login, register, etc del usuario */

const express = require('express'); // Importando 'Express'

const router = express.Router(); // Para definir las rutas al poder acceder a los métodos HTTP

const controller = require('../controllers/auth'); // Importando el controller


/* Definiendo las rutas */

router.post('/register', controller.register); // Ruta para registrarnos

router.post('/login', controller.login); // Ruta para logearnos

router.post('/logout', controller.logout); // Ruta para deslogearnos



// Importando este módulo de las rutas
module.exports = router;