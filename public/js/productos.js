const socket = io();
var mensajeDiv = document.getElementById("mensaje");
var datos = document.getElementById("datos");

// MOSTRAR DATOS DE LA BASE DE DATOS DE MONGODB
socket.on("servidorEnviarProductos", (productos)=>{
    // console.log(productos);
    var tr = "";
    productos.forEach((producto,idLocal) => {
        tr = tr + `
            <tr>
                <td>${idLocal}</td>
                <td>${producto.nombre}</td>
                <td>${producto.marca}</td>
                <td>${producto.cantidad}</td>
                <td>
                    <a href="#" onClick="editarProducto('${producto._id}')" class="btn btn-outline-primary">Editar</a>
                    <a href="#" onClick="borrarProducto('${producto._id}')" class="btn btn-outline-danger">Eliminar</a>
                </td>
            </tr>
        `;
    });
    datos.innerHTML = tr;
})

// GUARDAR DATOS A MONGODB
var enviarDatos = document.getElementById("enviarDatos");
enviarDatos.addEventListener("submit", (e)=>{
    e.preventDefault();
    // RECIBIR DATOS DEL FORMULARIO 
    var producto = {
        id: document.getElementById("id").value,
        nombre: document.getElementById("nombre").value,
        marca: document.getElementById("marca").value,
        cantidad: document.getElementById("cantidad").value,
    }
    socket.emit("clienteGuardarProducto", producto);
    socket.on("servidorProductoGuardado", (mensaje)=>{
        console.log(mensaje);
        mensajeDiv.innerHTML = mensaje;
        setTimeout(()=>{
            mensajeDiv.innerHTML = "";
            document.getElementById("txtNuevoProducto").innerHTML="Nuevo Producto";
            document.getElementById("txtGuardarProducto").innerHTML="Guardar Producto";
        }, 3000);
    });
    console.log("Recibiendo datos...");

    //REINICIAR EL FORMULARIO 
    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("nombre").focus()
});

// MODIFIcAR UN REGISTRO
function editarProducto(id) {
    console.log(id);
    socket.emit("clienteObtenerProductoPorID", id)
}
socket.on("servidorObtenerProductoPorID", (producto)=>{
    console.log(producto);
    document.getElementById("id").value = producto._id;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("marca").value = producto.marca;
    document.getElementById("cantidad").value = producto.cantidad;
    document.getElementById("txtNuevoProducto").innerHTML="Editar Producto";
    document.getElementById("txtGuardarProducto").innerHTML="Guardar Cambios";
});

// eLIMINAR UN REGiSTRO DE MONGODB 
function borrarProducto(id) {
    console.log(id);
    socket.emit("clienteBorrarProducto", id)
}

