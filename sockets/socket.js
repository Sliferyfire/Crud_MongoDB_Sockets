const Usuario = require("../models/usuario.js");
const Producto = require("../models/producto.js");

function socket(io) {
    io.on("connection", (socket)=>{
        // MOSTRAR REGISTROS 
        mostrarUsuarios();
        async function mostrarUsuarios() {
            const usuarios = await Usuario.find()
            //console.log(usuarios);
            io.emit("servidorEnviarUsuarios", usuarios);
        }
        
        //GUARDAR USUARIO
        socket.on("clienteGuardarUsuario", async(usuario)=>{
            try {
                await new Usuario(usuario).save();
                io.emit("servidorUsuarioGuardado", "Usuario guardado");
                console.log("Usuario guardado");
            } catch (err) {
                console.log("Error al guardar usuario" + err);
            }
        });

        // MOSTRAR PRODUCTOS
        mostrarProductos();
        async function mostrarProductos() {
            const productos = await Producto.find() 
            // console.log(productos);
            io.emit("servidorEnviarProductos", productos);
        }
        
        //GUARDAR PRODUCTO
        socket.on("clienteGuardarProducto", async(producto)=>{
            try {
                await new Producto(producto).save();
                io.emit("servidorProductoGuardado", "Producto guardado");
                console.log("Producto guardado");
            } catch (err) {
                console.log("Error al guardar producto" + err);
            }
        });

    }); // Fin IO.ON
}


module.exports = socket;



