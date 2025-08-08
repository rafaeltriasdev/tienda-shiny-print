const adminRouter = require('express').Router();
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

// Obtener todos los usuarios
adminRouter.get('/users', async (request, response) => {
    const users = await User.find({});
    return response.status(200).json(users);
});

// Obtener todos los productos
adminRouter.get('/products', async (request, response) => {
    const products = await Product.find({});
    return response.status(200).json(products);
});

// Obtener todas las órdenes
adminRouter.get('/orders', async (request, response) => {
    const orders = await Order.find({});
    return response.status(200).json(orders);
});

module.exports = adminRouter;