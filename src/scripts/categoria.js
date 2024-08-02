import { listar, buscar, eliminar, modificar, registrar } from "../modulos/modulo.js";
import { soloNumeros }  from "../modulos/numeros.js";
import requeridos from "../modulos/requiere.js";


const $form = document.querySelector("#form");
const $cod = document.querySelector("#codCateg");
const $nom = document.querySelector("#nomCateg");
const $zon = document.querySelector("#zonCateg");
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
    $zon.value = "";
    $search.value = "";
}

function contenido(){
    listar(`categoria`)
    .then((r)=>{
        r.forEach(e => {
            const tr = document.createElement("tr");
            const cod = document.createElement("td");
            const nom = document.createElement("td");
            const zon = document.createElement("td");
            const botones = document.createElement("tb");
            const dele = document.createElement("button");
            const modi = document.createElement("button");
    
            cod.textContent = e.id;
            nom.textContent = e.nombre;
            zon.textContent = e.zona;
            dele.textContent = "ELIMINAR";
            modi.textContent = "MODIFICAR";

            tr.classList.add("table__body");
            cod.classList.add("table__body");
            nom.classList.add("table__body");
            zon.classList.add("table__body");
            botones.classList.add("table__body");
            dele.classList.add("boton");
            modi.classList.add("boton");

            dele.classList.add("delete");
            modi.classList.add("modi");

            cod.classList.add("table--primer");
            nom.classList.add("table--name");
            zon.classList.add("table--segundo");
            botones.classList.add("table--last");

            botones.appendChild(dele);
            botones.appendChild(modi);
            tr.appendChild(cod);
            tr.appendChild(nom);
            tr.appendChild(zon);
            tr.appendChild(botones);

            dele.addEventListener("click", ()=>{
                eliminar(cod.textContent, `categoria`);
            })

            modi.addEventListener("click",()=>{
                $cod.value = e.id;
                $nom.value = e.nombre;
                $zon.value = e.zona
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
    let existe = false;
    let resp = requeridos(event, "#form [required]");
    if(resp){
        buscar($cod.value, `categoria`)
            .then((x)=>{
                if(x.id == $cod.value){
                    existe = true;
                }
            })
            if(existe){
                alert("ERROR: El CODIGO de la CATEGORIA ya esta en uso");
            }else{
                const data = {
                    id: $cod.value,
                    nombre: $nom.value,
                    zona: $zon.value
                }
                registrar(data, `categoria`);
                limpiar();
                alert("La CATEGORIA fue registrada con exito");
            }
    }
});

$modificar.addEventListener("click", ()=>{
    if($cod.value != "" || $nom.value != "" || $zon.value != ""){
        const datos ={
            nombre: $nom.value,
            zona: $zon.value
        }
        modificar($cod.value, datos, `categoria`);
        alert("La CATEGORIA fue modificada con exito");
        limpiar();
    }
    else{
        alert("ERROR: Los campos esta VACIOS");
    }
})

$delete.addEventListener("click", ()=>{
    if($cod.value != "" || $nom.value != "" || $zon.value != ""){
        eliminar($cod.value, `categoria`);
        alert("La CATEGORIA fue eliminada con exito");
        limpiar();
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
        buscar($buscarInput.value, `categoria`)
            .then((c)=>{
                $cod.value = c.id;
                $nom.value = c.nombre;
                $zon.value = c.zona
            })
            .catch(()=>{
                alert("ERROR: CATEGORIA no encontrada");
            })
    }
    else{
        alert("ERROR: Codigo no valido");
    }
})

