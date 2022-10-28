/* En este archivo configuraremos todo lo relacionado con la conexión a la B.D */

const mysql = require('mysql'); // Importando 'MySQL'

// Creando la conexión
const db = mysql.createConnection({

    // Rellenando los campos
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'blog_db'
});

// Exportando este módulo
module.exports = db;