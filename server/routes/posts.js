/* En este archivo definiremos las rutas relacionadas a la tabla 'post' de la B.D */

const express = require('express'); // Importando 'Express'

const router = express.Router(); // Para definir las rutas al poder acceder a los métodos HTTP

const controller = require('../controllers/posts'); // Importando el controller


/* Definiendo las rutas */

router.get('/', controller.getPosts); // Ruta para acceder a todos los 'posts'
router.get('/:id', controller.getPost); // Ruta para acceder a un 'post' en específico
router.post('/', controller.addPost); // Ruta para crear un nuevo 'post'
router.put('/:id', controller.updatePost); // Ruta para actualizar a un 'post' en específico
router.delete('/:id', controller.deletePost); // Ruta para eliminar a un 'post' en específico


// Importando este módulo de las rutas
module.exports = router;