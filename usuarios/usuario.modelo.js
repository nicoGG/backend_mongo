const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    usuario: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    creacion: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('usuarios', schema);