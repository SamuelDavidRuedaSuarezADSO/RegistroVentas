import { clientes, eliminarCliente, modificarCliente, registerCliente , clientesBuscar }from "../modulos/modulo.js"
import { soloNumeros } from "../modulos/numeros.js"; 

const $table = document.querySelector("#tbody");
const $frag = document.createDocumentFragment();
const $frag2 = document.createDocumentFragment();

const $form = document.querySelector("#form");
const $dni = document.querySelector("#clientCod");
const $name = document.querySelector("#clientNom");
const $last = document.querySelector("#clientLast");
const $num = document.querySelector("#clientNum");
const $email = document.querySelector("#clientEmail");
const $delte = document.querySelector("#delete");
const $modi = document.querySelector("#modi");

function limpiar(){
  $dni.value = "";
  $name.value = "";
  $last.value = "";
  $num.value = "";
  $email.value = "";
}

const list = () =>{
    clientes()
        .then((e)=>{
            e.forEach((x)=>{
                const tr = document.createElement("tr");
                const id = document.createElement("td");
                const name = document.createElement("td");
                const last = document.createElement("td");
                const num = document.createElement("td");
                const email = document.createElement("td");
                const botones = document.createElement("td");
                const drop = document.createElement("button");
                const modi = document.createElement("button");

                drop.textContent = "ELIMINAR";
                modi.textContent = "MODIFICAR";

                id.textContent = x.id;
                name.textContent = x.nombre;
                last.textContent = x.apellido;
                num.textContent = x.telefono;
                email.textContent = x.email;

                tr.classList.add("table__body");
                id.classList.add("table__body");
                id.classList.add("table--primer");
                name.classList.add("table__body");
                name.classList.add("table--name");
                last.classList.add("table__body");
                last.classList.add("table--segundo");
                num.classList.add("table__body");
                num.classList.add("table--segundo");
                email.classList.add("table__body");
                email.classList.add("table--segundo");
                botones.classList.add("table__body");
                botones.classList.add("table--last");

                drop.classList.add("boton");
                drop.classList.add("delete");
                modi.classList.add("boton");
                modi.classList.add("modi");

                let dni = x.id;

                drop.addEventListener("click", ()=>{
                    eliminarCliente(dni)
                  limpiar();
                })
                
                tr.appendChild(id);
                tr.appendChild(name);
                tr.appendChild(last);
                tr.appendChild(num);
                tr.appendChild(email);
                botones.appendChild(drop)
                botones.appendChild(modi)
                tr.appendChild(botones)
                $frag.appendChild(tr);
                $table.appendChild($frag);

                modi.addEventListener("click", (event)=>{
                    event.preventDefault();
                    $dni.value = id.textContent;
                    $name.value = name.textContent;
                    $last.value = last.textContent;
                    $num.value = num.textContent;
                    $email.value = email.textContent;
                })            
            })
        })
}

list();

const enviar = (event)=>{
    let exits = false
    event.preventDefault();
    if($dni.value != "" && $name.value != "" && $last.value != "" && $num.value != "" && $email.value != ""){
        
        clientesBuscar($dni.value)
        .then((data)=>{
            if(data){
                const datos = {
                id: $dni.value,
                nombre: $name.value,
                apellido: $last.value,
                telefono: $num.value,
                email: $email.value
                }
              registerCliente(datos);
              limpiar();
            }
            else{
                alert("ERROR: El CLIENTE ya existe");
            }
        })
        if(exits == true){
            alert("ERROR: El CLIENTE ya existe")
        }
        else{

        }
    }
    else{
        alert("ERROR: SELECCIONE UN CLIENTE");
    }
}
$form.addEventListener("submit", enviar);

$modi.addEventListener("click", (event)=>{
    event.preventDefault();
    clientes()
        .then((x)=>{
            x.forEach((element)=>{
                if($dni.value == element.id){
                    if($dni.value != "" && $name.value != "" && $last.value != "" && $num.value != "" && $email.value != ""){
                        const datos = {
                            nombre: $name.value,
                            apellido: $last.value,
                            telefono: $num.value,
                            email: $email.value
                        }
                      modificarCliente(datos, $dni.value);
                      limpiar();
                    }
                    else{
                        alert("ERROR: SELECCIONE UN CLIENTE");
                    }
                }
                else{
                    throw new Error ("ERROR: NO SE ENCONTRO NINGUN CIENTE");
                }
            })
        })
        .catch((error)=>{
            console.error("ERROR", error);
        })
})

$delte.addEventListener("click", (event)=>{
    event.preventDefault();
    if($dni.value != "" && $name.value != "" && $last.value != "" && $num.value != "" && $email.value != ""){
      eliminarCliente($dni.value);
      limpiar();
    }
    else{
        alert("ERROR: SELECCIONE UN CLIENTE");
    }
})

$dni.addEventListener("keypress", (event)=>{
    soloNumeros(event, $dni);
})

$num.addEventListener("keypress", (event)=>{
    soloNumeros(event, $num);
})