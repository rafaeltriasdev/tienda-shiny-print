const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  imagen: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
