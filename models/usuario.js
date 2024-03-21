const {mongoose} = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    usuario: {
        type: String,
        requird: true,
    },
    password: {
        type: String,
        required: true,
    },
    estatus: {
        type: Boolean,
        default: true,
    },
    
});

module.exports = new mongoose.model("usuario", usuarioSchema);






