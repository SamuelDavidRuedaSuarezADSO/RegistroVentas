import { registrar, buscar, eliminar, listar, modificar } from "../modulos/modulo.js";
import requeridos from "../modulos/requiere.js";
import { soloNumeros } from "../modulos/numeros.js";

const $form = document.querySelector("#form");
const $buscarForm = document.querySelector("#busca");
const $tabla = document.querySelector("#tbody");
const $cod = document.querySelector("#codMueble");
const $nomM = document.querySelector("#nomMueble");
const $categ = document.querySelector("#codCateg");
const $color = document.querySelector("#colorMueble");
const $mater = document.querySelector("#materialMueble");
const $preci = document.querySelector("#precioMueble");
const $stock = document.querySelector("#stockMueble");
const $buscarInput = document.querySelector("#input");

const $modificar = document.querySelector("#modi");
const $eliminar = document.querySelector("#delete");
const $clean = document.querySelector("#clean");

const $frag = document.createDocumentFragment();
const $fragC = document.createDocumentFragment();

function limpiar(){
    $cod.value = "";
    $nomM.value = "";
    $categ.value = "pre";
    $color.value = "";
    $mater.value = "";
    $preci.value = "";
    $stock.value = "";
    $buscarInput.value = "";
}

function listarCategoria(){
    listar(`categoria`)
        .then((elements)=>{
            elements.forEach(e => {
                const option = document.createElement("option");
                option.setAttribute("value", e.id);
                option.textContent = e.nombre;
                $fragC.appendChild(option);
            });
            $categ.appendChild($fragC);
        })
}
listarCategoria();

function llenarTabla(){
    listar(`muebles`)
        .then((elements)=>{ 
            elements.forEach(e => {
                const tr = document.createElement("tr");
                const codigo = document.createElement("td");
                const nombre = document.createElement("td");
                const catego = document.createElement("td");
                const color = document.createElement("td");
                const materi = document.createElement("td");
                const precio = document.createElement("td");
                const stock = document.createElement("td");
                const button = document.createElement("td");

                const dele = document.createElement("button");
                const modi = document.createElement("button");
                

                buscar(e.cod_categ, `categoria`)
                    .then( x => catego.textContent = x.nombre )
                    .catch( error => console.error("ERROR: ", error) )
                
                codigo.textContent = e.id;
                nombre.textContent = e.nombre;
                color.textContent = e.color;
                materi.textContent = e.material;
                precio.textContent = e.precio;
                stock.textContent = e.stock;

                dele.textContent = "ELIMINAR";
                modi.textContent = "MODIFICAR";

                tr.classList.add("table__body");
                codigo.classList.add("table__body");
                nombre.classList.add("table__body");
                catego.classList.add("table__body");
                color.classList.add("table__body");
                materi.classList.add("table__body");
                precio.classList.add("table__body");
                stock.classList.add("table__body");
                button.classList.add("table__body");
                dele.classList.add("boton");
                modi.classList.add("boton");
                
                codigo.classList.add("table--primer");
                nombre.classList.add("table--name");
                catego.classList.add("table--segundo");
                color.classList.add("table--segundo");
                materi.classList.add("table--segundo");
                precio.classList.add("table--segundo");
                stock.classList.add("table--segundo");
                button.classList.add("table--last");
                dele.classList.add("delete");
                modi.classList.add("modi");

                dele.addEventListener("click", ()=>{
                    let confirmar = confirm("¿Esta seguro de ELIMINAR este mueble?")
                    if(confirmar){
                        eliminar(codigo.textContent, `muebles`);
                        alert("MUEBLE eliminado con exito")
                    }
                })

                modi.addEventListener("click", (event)=>{
                    event.preventDefault()
                    $cod.value = codigo.textContent;
                    $nomM.value = nombre.textContent;
                    $categ.value = e.cod_categ;
                    $color.value = color.textContent;
                    $mater.value = materi.textContent;
                    $preci.value = precio.textContent;
                    $stock.value = stock.textContent;
                })

                button.appendChild(dele);
                button.appendChild(modi);

                tr.appendChild(codigo);
                tr.appendChild(nombre);
                tr.appendChild(catego);
                tr.appendChild(color);
                tr.appendChild(materi);
                tr.appendChild(precio);
                tr.appendChild(stock);
                tr.appendChild(button);

                $frag.appendChild(tr);
            });
            $tabla.appendChild($frag);
        })
}
llenarTabla();

$form.addEventListener("submit", (event)=>{
    let vali = requeridos(event, "#form [required]");
    if(vali){
        if($categ.value != "pre"){
            const datos = {
                id: $cod.value,
                nombre: $nomM.value,
                cod_categ: $categ.value,
                color: $color.value,
                material: $mater.value,
                precio: $preci.value,
                stock: $stock.value
            }
            registrar(datos, `muebles`);
            alert("MUEBLE registrado con exito");
            limpiar();
        }
        else{
            alert("ERROR: Seleccion una categoria");
        }
    }
    else{
        alert("ERROR: Completa todos los campos")
    }
})

$cod.addEventListener("keypress", (event)=>{
    soloNumeros(event, $cod);
})
$preci.addEventListener("keypress", (event)=>{
    soloNumeros(event, $preci);
})
$stock.addEventListener("keypress", (event)=>{
    soloNumeros(event, $stock);
})

$modificar.addEventListener("click", ()=>{
    if($cod.value != ""){
        const datos = {
            nombre: $nomM.value,
            cod_categ: $categ.value,
            color: $color.value,
            material: $mater.value,
            precio: $preci.value,
            stock: $stock.value
        }
        modificar($cod.value, datos, `muebles`);
        alert("MUEBLE modificado con exito");
        limpiar();
    }
    else{
        alert("ERROR: Seleccione un mueble para modificar");
    }
})

$eliminar.addEventListener("click", ()=>{
    if($cod.value != ""){
        let confirmar = confirm("¿Estas seguro de ELIMINAR este mueble?");
        if(confirmar){
            eliminar($cod.value, `muebles`)
            alert("MUEBLE eliminado con exito");
            limpiar();
        }
    }
    else{
        alert("ERROR: Seleccion un MUEBLE para ELIMINAR");
    }
})

$clean.addEventListener("click", ()=>{
    limpiar();
})

$buscarInput.addEventListener("keypress", (event)=>{
    soloNumeros(event, $buscarInput);
})

$buscarForm.addEventListener("submit", (event)=>{
    let vali = requeridos(event, "#busca [required]");
    if(vali){
        buscar($buscarInput.value, `muebles`)
            .then((r)=>{
                $cod.value = r.id,
                $nomM.value = r.nombre,
                $categ.value = r.cod_categ,
                $color.value = r.color,
                $mater.value = r.material,
                $preci.value = r.precio,
                $stock.value = r.stock
                $buscarInput.value = "";
            })
            .catch((error)=>{
                console.error("ERROR: ", error);
                alert("ERROR: El MUEBLE no existe");
                limpiar()
            })
    }
    else{
        alert("ERROR: Ingresa el codigo de un mueble que desees BUSCAR");
    }
})
