require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout'); // Controlador para manejar el cierre de sesión
const adminRouter = require('./controllers/admin');
const productsRouter = require('./controllers/products');
const ordersRouter = require('./controllers/orders');
const { userExtractor, adminOnly } = require('./middleware/auth'); // Middleware para extraer el usuario autenticado
const { MONGO_URI } = require('./config'); // Importar la URI de conexión a MongoDB desde el archivo de configuración

(async() =>{

// Servir archivos estáticos de la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conecto a Mongo DB');
    } catch (error) {
        console.log(error);
    }
})();
//Middlewares que se ejecutan antes de las rutas
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Rutas Frontend
app.use(express.static(path.resolve('views'))); // Rutas para archivos estáticos
app.use('/js', express.static(path.resolve('views', 'js')));// Rutas para archivos JavaScript
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/tienda', express.static(path.resolve('views', 'tienda')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/img', express.static(path.resolve('img')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));
app.use('/admin', express.static(path.resolve('views', 'admin')));
app.use('/admin/products', express.static(path.resolve('views', 'admin', 'products')));
app.use('/admin/users', express.static(path.resolve('views', 'admin', 'users')));
app.use('/admin/orders', express.static(path.resolve('views', 'admin', 'orders')));

//MORGAN
// Morgan es un middleware que permite registrar las peticiones HTTP en la consola
app.use(morgan('tiny'));


//Rutas Backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/products', userExtractor, adminOnly, productsRouter);
app.use('/api/orders', userExtractor, adminOnly, ordersRouter);
app.use('/api/admin', userExtractor, adminOnly, adminRouter);// Rutas protegidas por el middleware userExtractor y adminOnly




module.exports = app;
