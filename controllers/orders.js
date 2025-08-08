const express = require('express');
const ordersRouter = express.Router();
const Order = require('../models/order');
const user = require('../models/user');

// Obtener todos los pedidos
ordersRouter.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name').exec();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

// Obtener un pedido por ID
ordersRouter.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name').exec();
    if (!order) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedido' });
  }
});

// Crear un nuevo pedido
ordersRouter.post('/', async (req, res) => {
  try {
    const { user, products, total, status } = req.body;
    const newOrder = new Order({ user, products, total, status });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear pedido' });
  }
});

// Actualizar un pedido
ordersRouter.put('/:id', async (req, res) => {
  try {
    const { user, products, total, status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { user, products, total, status },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar pedido' });
  }
});

// Eliminar un pedido
ordersRouter.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json({ message: 'Pedido eliminado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar pedido' });
  }
});

module.exports = ordersRouter;
