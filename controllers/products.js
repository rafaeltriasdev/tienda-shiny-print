const express = require("express");
const productsRouter = express.Router();
const Product = require("../models/product");

// Obtener todos los productos
productsRouter.get("/", async (req, res) => {
try {
    const products = await Product.find();
    res.json(products);
} catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
}
});

// Crear un nuevo producto
productsRouter.post("/", async (req, res) => {
try {
    const { name, description, price, image } = req.body;
    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();
    res.status(201).json(newProduct);
} catch (error) {
    res.status(400).json({ error: "Error al crear producto" });
}
});

// Actualizar un producto existente
productsRouter.put("/:id", async (req, res) => {
try {
    const { name, description, price, image } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { name, description, price, image },
    { new: true }
);
if (!updatedProduct)
    return res.status(404).json({ error: "Producto no encontrado" });
    res.json(updatedProduct);
} catch (error) {
    res.status(400).json({ error: "Error al actualizar producto" });
}
});

// Eliminar un producto
productsRouter.delete("/:id", async (req, res) => {
try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
    return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
} catch (error) {
    res.status(400).json({ error: "Error al eliminar producto" });
}
});

module.exports = productsRouter;
