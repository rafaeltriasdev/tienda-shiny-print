const productsRouter = require('express').Router();
const User = require('../models/user');
const Product = require('../models/product');
const path = require('path');
const upload = require('../middleware/upload');

// Obtener todos los productos
productsRouter.get('/', async (request, response) => {
    try {
        const products = await Product.find({});
        return response.status(200).json(products);
    } catch (error) {
        return response.status(500).json({ error: 'Error al obtener productos', details: error.message });
    }
});

// Crear un nuevo producto (con imagen)
productsRouter.post('/', upload.single('imagen'), async (request, response) => {
    try {
        // No desestructurar imagen de request.body, solo nombre, descripcion, precio
        const nombre = request.body.nombre;
        const descripcion = request.body.descripcion;
        const precio = request.body.precio;
        let imagenUrl = '';
        if (request.file) {
            imagenUrl = '/uploads/' + request.file.filename;
        } else {
            return response.status(400).json({ error: 'La imagen es obligatoria' });
        }
        if (!nombre || !descripcion || precio == null) {
            return response.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const newProduct = new Product({ imagen: imagenUrl, nombre, descripcion, precio });
        const savedProduct = await newProduct.save();
        return response.status(201).json(savedProduct);
    } catch (error) {
        return response.status(500).json({ error: 'Error al crear producto', details: error.message });
    }
});

// Eliminar un producto
productsRouter.delete('/:id', async (request, response) => {
    try {
        const productId = request.params.id;
        const deleted = await Product.findByIdAndDelete(productId);
        if (!deleted) {
            return response.status(404).json({ error: 'Producto no encontrado' });
        }
        return response.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        return response.status(500).json({ error: 'Error al eliminar producto', details: error.message });
    }
});

// Actualizar un producto (con imagen opcional)
productsRouter.patch('/:id', upload.single('imagen'), async (request, response) => {
    try {
        const nombre = request.body.nombre;
        const descripcion = request.body.descripcion;
        const precio = request.body.precio;
        if (!nombre || !descripcion || precio == null) {
            return response.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Buscar el producto actual para conservar la imagen si no se sube una nueva
        const productoActual = await Product.findById(request.params.id);
        if (!productoActual) {
            return response.status(404).json({ error: 'Producto no encontrado' });
        }

        let updateData = { nombre, descripcion, precio };
        if (request.file) {
            updateData.imagen = '/uploads/' + request.file.filename;
        } else {
            updateData.imagen = productoActual.imagen; // Mantener la imagen anterior
        }

        const updated = await Product.findByIdAndUpdate(request.params.id, updateData, { new: true });
        return response.json(updated);
    } catch (error) {
        return response.status(500).json({ error: 'Error al actualizar producto', details: error.message });
    }
});

module.exports = productsRouter;