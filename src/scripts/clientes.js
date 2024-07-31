import { listar, eliminar, buscar, registrar, modificar }from "../modulos/modulo.js"
import { soloNumeros } from "../modulos/numeros.js";
import requeridos from "../modulos/requiere.js";

const rege =  /^[\w-._]+@[\w.-_]+(\.[a-zA-Z]{2,4}){1,2}$/;

const $table = document.querySelector("#tbody");
const $frag = document.createDocumentFragment();
const $busca = document.querySelector("#busca")

const $form = document.querySelector("#form");
const $dni = document.querySelector("#clientCod");
const $name = document.querySelector("#clientNom");
const $last = document.querySelector("#clientLast");
const $num = document.querySelector("#clientNum");
const $email = document.querySelector("#clientEmail");
const $delte = document.querySelector("#delete");
const $modi = document.querySelector("#modi");
const $search = document.querySelector("#input")

function limpiar(){
  $dni.value = "";
  $name.value = "";
  $last.value = "";
  $num.value = "";
  $email.value = "";
}

const list = () =>{
    listar(`clientes`)
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
                    eliminar(dni, `clientes`)
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

$form.addEventListener("submit", (event)=>{
    let exits = false;
    let resp = requeridos(event, "#form [required]");
    if(resp){
        if(rege.test($email.value)){
            buscar($dni.value, `clientes`)
                .then((data)=>{
                    if(data.id == $dni.value){
                        exits = true;
                    }
                    if(exits){
                        alert("ERROR: El CLIENTE ya existe")
                    }
                    else{
                        const datos = {
                            id: $dni.value,
                            nombre: $name.value,
                            apellido: $last.value,
                            telefono: $num.value,
                            email: $email.value
                        };
                        registrar(datos, `clientes`);
                        limpiar();
                        alert("El CLIENTE fue creado con exito");
                    }
                })
        }
    }
    else{
        alert("ERROR: los CAMPOS estan VACIOS");
    }
});

$modi.addEventListener("click", (event)=>{
    event.preventDefault();
    if($dni.value != "" && $name.value != "" && $last.value != "" && $num.value != "" && $email.value != ""){
        if(rege.test($email.value)){
            listar(`clientes`)
                .then((x)=>{
                    x.forEach((element)=>{
                        if($dni.value == element.id){
                            const datos = {
                                nombre: $name.value,
                                apellido: $last.value,
                                telefono: $num.value,
                                email: $email.value
                            }
                            modificar($dni.value, datos, `clientes`);
                            limpiar();
                        }
                        else{
                            throw new Error ("ERROR: No se encontro CIENTE");
                        }
                    })
                })
                .catch((error)=>{
                    console.error("ERROR", error);
                })
        }
    }
    else{
        alert("ERROR: SELECCIONE UN CLIENTE");
    }
})

$delte.addEventListener("click", (event)=>{
    event.preventDefault();
    if($dni.value != "" && $name.value != "" && $last.value != "" && $num.value != "" && $email.value != ""){
      eliminar($dni.value, `clientes`);
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

$search.addEventListener("keypress", (event)=>{
    soloNumeros(event, $search);
})

$busca.addEventListener("submit", (event)=>{
    event.preventDefault();
    if($search.value != ""){
        let id = $search.value;
        buscar(id, `clientes`)
            .then((x)=>{{
                $dni.value = x.id;
                $name.value = x.nombre;
                $last.value = x.apellido;
                $num.value = x.telefono;
                $email.value = x.email;
                alert("Se encontro un CLIENTE");
            }})
            .catch((error)=>{
                console.error("ERROR", error);
                alert("ERROR: No se encontro ningun CLIENTE");
            })
    }
    else{
        alert("ERROR: Ingrese el CODIGO del CLIENTE");
    }

});