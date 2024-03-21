const {mongoose} = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        requird: true,
    },
    cantidad: {
        type: String,
        required: true,
    },

});

module.exports = new mongoose.model("producto", productoSchema);






