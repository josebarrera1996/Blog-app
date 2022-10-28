/* En este archivo definiremos la lógica que será implementada al acceder a las rutas de 'posts' */

const db = require('../db'); // Importando este módulo para conectarnos a la B.D e interactuar

const jwt = require('jsonwebtoken'); // Importando 'JWT'

/* Definiendo los métodos */

const getPosts = (req, res) => { // Método para obtener todos los 'posts' dependiendo de la categoría

    // Obteniendo el parámetro requerido para obtener la categoría
    const category = req.query.cat;

    // Desarrollando la query
    // Si se ha seleccionado una 'categoría' traer los 'posts' relacionadas a ella
    // Caso contrario, traer todos los 'posts'
    const query = category ? "SELECT * FROM posts WHERE category=?" : "SELECT * FROM posts";

    db.query(query, [req.query.cat], (err, data) => {

        if (err) return res.json(err); // Retornar este mensaje de error por si hay problemas de interacción con la B.D

        // Si todo ha sido exitoso...
        return res.status(200).json(data); // Retornar el estado '200' y los datos en formato JSON
    });
}

const getPost = (req, res) => { // Método para traer la información de un 'post' en específico

    // Utilizando JOIN para la unión de los campos de 2 tablas
    const query = "SELECT p.id, `username`, `title`, `description`, p.img, u.img AS userImg, `category`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

    // Creando la query
    db.query(query, [req.params.id], (err, data) => {

        if (err) return res.status(500).json(err); // Retornar este mensaje de error por si hay problemas de interacción con la B.D

        return res.status(200).json(data[0]); // Retornar el 'post' indicado
    });
}

const addPost = (req, res) => { // Método para crear un nuevo 'post'

    // Chequeando si estamos autentificados...
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!"); // Si no lo estamos, mostrar este error.

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // Desarrollando lógica de la query
        const query = "INSERT INTO posts(`title`, `description`, `img`, `category`, `date`,`uid`) VALUES (?)";

        const values = [

            // Llenando los campos de la tabla 'post' con los datos del request body
            req.body.title,
            req.body.description,
            req.body.img,
            req.body.category,
            req.body.date,
            userInfo.id,
        ];

        // Creando el nuevo registro
        db.query(query, [values], (err, data) => {

            if (err) return res.status(500).json(err);
            return res.json("Post has been created.");
        });
    });
}

const updatePost = (req, res) => {

    // Chequeando si estamos autentificados...
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!"); // Si no lo estamos, mostrar este error.

    jwt.verify(token, "jwtkey", (err, userInfo) => {

        // Si el post a actualizar no fue realizado por el usuario actualmente conectado, mostrar el siguiente error
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id;

        // Desarrollando lógica de la query
        const q = "UPDATE posts SET `title`=?,`description`=?,`img`=?,`category`=? WHERE `id` = ? AND `uid` = ?";

        const values = [req.body.title, req.body.description, req.body.img, req.body.category];

        // Actualizando el registro especificado
        db.query(q, [...values, postId, userInfo.id], (err, data) => {

            if (err) return res.status(500).json(err);
            return res.json("Post has been updated.");
        });
    });
}

const deletePost = (req, res) => { // Método para eliminar un 'post' en específico

    // Chequear si estamos autentificados, es decir, no estamos autorizados para eliminar el post indicado
    const token = req.cookies.access_token; // Accedemos a el token

    if (!token) return res.status(401).json('Not authenticated!'); // Devolver este error si no estamos autenficiados

    // Incluso si tenemos el JWT, se debe chequear que el post en cuestión corresponde al usuario conectado
    jwt.verify(token, "jwtkey", (err, userInfo) => {

        if (err) return res.status(403).json("Token is not valid!"); // Si hay error, devolver este mensaje

        const postId = req.params.id; // Acceder al parámetro con el valor 'id'
        // Desarrollar la lógica del query
        const query = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

        db.query(query, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your post!"); // Si hay error, devolver este mensaje

            // En caso de éxito...
            return res.json("Post has been deleted!");
        });
    });
}

// Exportando los métodos
module.exports = {

    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
}

