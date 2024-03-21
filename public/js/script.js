const socket = io();
var mensajeDiv = document.getElementById("mensaje");
var datos = document.getElementById("datos");

// MOSTRAR DATOS DE LA BASE DE DATOS DE MONGODB
socket.on("servidorEnviarUsuarios", (usuarios)=>{
    //console.log(usuarios);
    var tr = "";
    usuarios.forEach((usuario,idLocal) => {
        tr = tr + `
            <tr>
                <td>${idLocal}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.password}</td>
                <td>
                    <a href="#" onClick="editarUsuario('${usuario._id}')" class="btn btn-outline-primary">Editar</a>
                    <a href="#" onClick="borrarUsuario('${usuario._id}')" class="btn btn-outline-danger">Eliminar</a>
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
    var usuario = {
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value,
    }
    socket.emit("clienteGuardarUsuario", usuario);
    socket.on("servidorUsuarioGuardado", (mensaje)=>{
        console.log(mensaje);
        mensajeDiv.innerHTML = mensaje;
        setTimeout(()=>{
            mensajeDiv.innerHTML = "";
        }, 3000);
    });
    console.log("Recibiendo datos...");

    //REINICIAR EL FORMULARIO 
    document.getElementById("nombre").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
    document.getElementById("nombre").focus()
});

// MODIFIcAR UN REGISTRO
function editarUsuario(id) {
    console.log(id);
}

// eLIMINAR UN REGiSTRO DE MONGODB 
function borrarUsuario(id) {
    console.log(id);
}
