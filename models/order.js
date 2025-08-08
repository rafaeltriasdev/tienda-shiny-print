const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      name: String,
      price: Number,
      quantity: Number,
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'], default: 'pendiente' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
