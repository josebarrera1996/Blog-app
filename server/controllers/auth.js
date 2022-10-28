/* En este archivo definiremos la lógica que será implementada al acceder a las rutas de 'auth' */

const db = require('../db'); // Importando este módulo para conectarnos a la B.D e interactuar
const bcryptjs = require('bcryptjs'); // Importando este módulo para hashear las passwords
const jwt = require('jsonwebtoken'); // Importando este módulo para la seguridad de Json Web Token

/* Definiendo los métodos */

const register = (req, res) => { // Lógica para poder registrarnos

    // Chequear si los campos 'username' & 'email' ya están en la B.D
    const query = 'SELECT * FROM users WHERE email = ? OR username = ?';

    db.query(query, [req.body.email, req.body.username], (err, data) => {

        if (err) return  res.json(err); // Retornar este mensaje de error por si hay problemas de interacción con la B.D
        
        // Si el 'email' o el 'username' ya están ocupados...
        if (data.length) return res.status(409).json("User or email aready exists!"); // Retornar este mensaje

        // Si no hay error en la conexión & los campos 'email' y 'username' no existen, podemos registrar el usuario

        // Realizando el 'hashing' a la password
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(req.body.password, salt);

        // Insertando el nuevo registro
        const query = 'INSERT INTO users (`username`, `email`, `password`) VALUES (?)'; // Lógica de la query

        const values = [ req.body.username, req.body.email, hash ]; // Almacenando los valores del request body

        db.query(query, [values], (err, data) => {

            if (err) return  res.json(err); // Retornar este mensaje de error por si hay problemas de interacción con la B.D

            // Si no hay ningún tipo de error...
            return res.status(200).json('User has been created.');
        });
    })
}

const login = (req, res) => { // Lógica para poder logearnos

    // Chequear si el usuario existe o no
    const query = 'SELECT * FROM users WHERE username = ?'; // Query

    db.query(query, [req.body.username], (err, data) => {

        if (err) return  res.json(err); // Retornar este mensaje de error por si hay problemas de interacción con la B.D

        if (data.length === 0) return res.status(404).json('User not found!') // Si 'data' no tiene longitud, es porque no existe el usuario en la B.D

        /* Si el usuario existe */

        // Comparando las passwords (con la que nos registramos y su encriptación)
        const isPasswordCorrect = bcryptjs.compareSync(req.body.password, data[0].password);
        
        // Si no hay coincidencia
        if (!isPasswordCorrect) return res.status(400).json('Wrong username or password!');

        // Creando nuestro token de seguridad
        // Con la finalidad de verificar que los 'posts' que hayamos realizado sean de los usuarios que los hicieron
        const token = jwt.sign({ id: data[0].id }, "jwtkey"); // La info que nos identificará será el campo 'id'
        const { password, ...other} = data[0]; // Información que será enviada en el Cookie

        // Enviando este token como una 'cookie'
        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json(other);
        
    });

}

const logout = (req, res) => { // Lógica para poder deslogearnos

    // Limpiar las Cookies
    res.clearCookie('access_token', {
        sameSite: 'none',
        secure: true
    }).status(200).json('User has been logged out.');
}


// Exportando los métodos
module.exports = {
    register,
    login,
    logout
}