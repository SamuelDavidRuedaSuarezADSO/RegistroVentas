import { listar, buscar, eliminar, modificar, registrar } from "../modulos/modulo.js";
import { soloNumeros }  from "../modulos/numeros.js";
import requeridos from "../modulos/requiere.js";


const $cod = document.querySelector("#codCateg");
const $nom = document.querySelector("#nomCateg");
const $zon = document.querySelector("#zonCateg");
const $table = document.querySelector("#tbody");

const $form = document.querySelector("#form");

const $frag = document.createDocumentFragment();

function limpiar(){
    $cod.value = "";
    $nom.value = "";
    $zon.value = "";
}

$cod.addEventListener("keypress", (event)=>{
    soloNumeros(event, $cod);
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
    
            $frag.appendChild(tr);
    
        });
        $table.appendChild($frag);
    })


}

contenido();