const productsRouter = require('express').Router();
const User = require('../models/user');
const Product = require('../models/product');

// Obtener todos los productos
productsRouter.get('/', async (request, response) => {
    const products = await Product.find({});
    return response.status(200).json(products);
});

// Crear un nuevo producto
productsRouter.post('/', async (request, response) => {
    const { imagen, nombre, descripcion, precio } = request.body;
    const newProduct = new Product({
        imagen,
        nombre,
        descripcion,
        precio
    });
    const savedProduct = await newProduct.save();
    return response.status(201).json(savedProduct);
});

// Eliminar un producto
productsRouter.delete('/:id', async (request, response) => {
    const productId = request.params.id;
    await Product.findByIdAndDelete(productId);
    return response.sendStatus(204);
});

// Actualizar un producto
productsRouter.patch('/:id', async (request, response) => {
    const { imagen, nombre, descripcion, precio } = request.body;
    await Product.findByIdAndUpdate(request.params.id, { imagen, nombre, descripcion, precio });
    return response.sendStatus(200);
});

module.exports = productsRouter;