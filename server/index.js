/* Archivo principal de la aplicación */

const express = require('express'); // Importando 'Express'

const authRoutes = require('./routes/auth'); // Importando el módulo de las rutas de 'auth'
const userRoutes = require('./routes/users'); // Importando el módulo de las rutas de los 'users'
const postRoutes = require('./routes/posts'); // Importando el módulo de las rutas de los 'posts'
const cookieParser = require('cookie-parser'); // Importando el módulo para manejar las 'Cookies'
const multer = require('multer'); // Importando el módulo para el manejo de imágenes

const app = express(); // Creando una aplicación 'Express'


// Middlewares

app.use(express.json()); // Para trabajar con JSON
app.use(cookieParser()); // Para trabajar con 'Cookies'



// Lógica para el guardado de las imágenes subidas

const storage = multer.diskStorage({ // Función para almacenar las imágenes

    destination: (req, file, cb) => { // Donde serán alojadas las imágenes subidas
        cb(null, '../client/public/images');
    },
    filename: (req, file, cb) => { // Con que nombre serán alojadas
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage }); // Ruta en donde alojaremos las imágenes subidas

app.post('/api/upload', upload.single('file'), function (req, res) { // Método para subir imágenes 

    const file = req.file;
    res.status(200).json(file.filename);
});



// Implementando el sistema de ruteo

app.use('/api/auth', authRoutes); // http://wwww.localhost:8800/api/auth + rutas definidas en 'authRoutes'
app.use("/api/users", userRoutes); // http://wwww.localhost:8800/api/users + rutas definidas en 'userRoutes'
app.use("/api/posts", postRoutes); // http://wwww.localhost:8800/api/posts + rutas definidas en 'postRoutes'



// Escuchando el servidor

app.listen(8800, () => {
    console.log('Connected');
});