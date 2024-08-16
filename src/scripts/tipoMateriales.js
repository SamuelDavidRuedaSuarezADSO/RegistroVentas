import { listar, buscar, eliminar, modificar, registrar } from "../modulos/modulo.js";
import { soloNumeros }  from "../modulos/numeros.js";
import requeridos from "../modulos/requiere.js";


const $form = document.querySelector("#form");
const $cod = document.querySelector("#codCateg");
const $nom = document.querySelector("#nomCateg");
const $table = document.querySelector("#tbody");
const $modificar = document.querySelector("#modi"); 
const $delete = document.querySelector("#delete");
const $buscarInput = document.querySelector("#input");
const $buscarBoton = document.querySelector("#buscar");
const $buscarForm = document.querySelector("#busca");


const $frag = document.createDocumentFragment();

const $clean = document.querySelector("#clean");

function limpiar(){
    $cod.value = "";
    $nom.value = "";
    $buscarInput.value = "";
}

function contenido(){
    listar(`tipoMaterial`)
    .then((r)=>{
        r.forEach(e => {
            const tr = document.createElement("tr");
            const cod = document.createElement("td");
            const nom = document.createElement("td");
            const botones = document.createElement("tb");
            const dele = document.createElement("button");
            const modi = document.createElement("button");
    
            cod.textContent = e.id;
            nom.textContent = e.nombre;
            dele.textContent = "ELIMINAR";
            modi.textContent = "MODIFICAR";

            tr.classList.add("table__body");
            cod.classList.add("table__body");
            nom.classList.add("table__body");
            botones.classList.add("table__body");
            dele.classList.add("boton");
            modi.classList.add("boton");

            dele.classList.add("delete");
            modi.classList.add("modi");

            cod.classList.add("table--primer");
            nom.classList.add("table--name");
            botones.classList.add("table--last");

            botones.appendChild(dele);
            botones.appendChild(modi);
            tr.appendChild(cod);
            tr.appendChild(nom);
            tr.appendChild(botones);

            dele.addEventListener("click", (event)=>{
                event.preventDefault();
                let confirmar = confirm("¿Esta seguro de eliminar este TIPO DE MATERIAL?")
                if(confirmar){
                    eliminar(cod.textContent, `tipoMaterial`);
                    limpiar();
                    alert("TIPO DE MATERIAL eliminado con exito");
                }
            })

            modi.addEventListener("click",()=>{
                $cod.value = e.id;
                $nom.value = e.nombre;
            })
    
            $frag.appendChild(tr);
    
        });
        $table.appendChild($frag);
    })


}
contenido();
$cod.addEventListener("keypress", (event)=>{
    soloNumeros(event, $cod);
})

$buscarInput.addEventListener("keypress", (event)=>{
    soloNumeros(event, $buscarInput);
})

$form.addEventListener("submit", (event)=>{
    event.preventDefault();
    let resp = requeridos(event, "#form [required]");
    if(resp){
        let existe = false;
        listar(`tipoMaterial`)
            .then((x)=>{
                x.forEach((a)=>{
                    if(a.id == $cod.value){
                        existe = true;
                    }
                })
                if(existe){
                    alert("ERROR: El CODIGO del TIPO DE MATERIAL ya esta en uso");
                }
                else{
                    const data = {
                        id: $cod.value,
                        nombre: $nom.value,
                    }
                    registrar(data, `tipoMaterial`);
                    limpiar();
                    alert("El TIPO DE MATERIAL fue registrado con exito");
                }
            })     
    }
});

$modificar.addEventListener("click", ()=>{
    if($cod.value != "" || $nom.value != ""){
        const datos ={
            nombre: $nom.value,
        }
        modificar($cod.value, datos, `tipoMaterial`);
        alert("El TIPO DE MATERIAL fue modificada con exito");
        limpiar();
    }
    else{
        alert("ERROR: Los campos esta VACIOS");
    }
})

$delete.addEventListener("click", ()=>{
    if($cod.value != "" || $nom.value != ""){
        let confirmar = confirm("¿Esta reguro de eliminar este TIPO DE MATERIAL?")
        if(confirmar){
            eliminar($cod.value, `tipoMaterial`);
            alert("El TIPO DE MATERIAL fue eliminada con exito");
            limpiar();
        }
    }
    else{
        alert("ERROR: Los campos esta VACIOS");
    }
})

$clean.addEventListener("click", ()=>{
    limpiar();
})

$buscarForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    if($buscarInput.value != ""){
        buscar($buscarInput.value, `tipoMaterial`)
            .then((c)=>{
                $cod.value = c.id;
                $nom.value = c.nombre;
            })
            .catch(()=>{
                alert("ERROR: TIPO DE MATERIAL no encontrada");
            })
    }
    else{
        alert("ERROR: Codigo no valido");
    }
})

