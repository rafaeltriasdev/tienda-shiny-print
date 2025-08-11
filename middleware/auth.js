const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para manejar tokens JWT
const User = require('../models/user'); // Importa el modelo de usuario


// Middleware para extraer el usuario del token JWT
const userExtractor = async (request, response, next) => { // Verifica si el token está presente en las cookies
    try {
        const token = request.cookies?.accessToken; // Accede al token desde las cookies de la solicitud
        console.log('Token recibido:', token);
        if (!token) {
            return response.status(401).json({ error: 'Token faltante' }); // Si no hay token, devuelve un error 401 (No autorizado)
    }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Verifica el token usando la clave secreta
        const user = await User.findById(decoded.id); // Busca el usuario en la base de datos usando el ID del token
        console.log('Usuario encontrado:', user);
        if (!user) {
            return response.status(401).json({ error: 'Usuario no encontrado' }); // Si no se encuentra el usuario, devuelve un error 401 (No autorizado)
        }
        request.user = user;
        next();
    } catch (error) { // Si hay un error al verificar el token, devuelve un error 403 (Prohibido)
        return response.status(403).json({ error: 'Token inválido' });
    }
};

// Middleware para permitir solo administradores (autorización)
const adminOnly = (request, response, next) => {
    console.log('¿Es admin?', request.user?.isAdmin);
    if (!request.user || !request.user.isAdmin) {
        return response.status(403).json({ error: 'Acceso denegado: se requiere ser administrador' });
    }
    next();
};

module.exports = { userExtractor, adminOnly };