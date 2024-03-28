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
                if(usuario.id == ""){
                    await new Usuario(usuario).save();
                    io.emit("servidorUsuarioGuardado", "Usuario guardado");
                    console.log("Usuario guardado");
                }
                else {
                    await Usuario.findByIdAndUpdate(usuario.id,usuario)
                    io.emit("servidorUsuarioGuardado", "Usuario Modificado");
                }
            } catch (err) {
                console.log("Error al guardar usuario" + err);
            }
        });

        //OBTENER USUARIO POR ID 
        socket.on("clienteObtenerUsuarioPorID", async (id)=>{
            const usuario = await Usuario.findById(id);
            io.emit("servidorObtenerUsuarioPorID", usuario);
        });

        //BORRAR USUARIO POR ID
        socket.on("clienteBorrarUsuario", async (id)=>{
            await Usuario.findByIdAndDelete(id)
            io.emit("servidorUsuarioGuardado", "Usuario Borrado");
            mostrarUsuarios();
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
                if (producto.id == "") {
                    await new Producto(producto).save();
                    io.emit("servidorProductoGuardado", "Producto guardado");
                    console.log("Producto guardado");
                }
                else{
                    await Producto.findByIdAndUpdate(producto.id,producto)
                    io.emit("servidorProductoGuardado", "Producto Modificado");
                }
            } catch (err) {
                console.log("Error al guardar producto" + err);
            }
        });

        //OBTENER PRODUCTO POR ID 
        socket.on("clienteObtenerProductoPorID", async (id)=>{
            const producto = await Producto.findById(id);
            io.emit("servidorObtenerProductoPorID", producto);
        });

        //BORRAR PRODUCTO POR ID
        socket.on("clienteBorrarProducto", async (id)=>{
            await Producto.findByIdAndDelete(id)
            io.emit("servidorProductoGuardado", "Producto Borrado");
            mostrarProductos();
        });
    }); // Fin IO.ON
}


module.exports = socket;



