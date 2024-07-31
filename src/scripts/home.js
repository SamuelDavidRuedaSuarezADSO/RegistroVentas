import { buscar, eliminar, modificar, listar, registrar } from "../modulos/modulo.js";

const $frag = document.createDocumentFragment();
const $empleNom = document.querySelector("#empleNom");
const $empleCod = document.querySelector("#empleCod");
const $clienNom = document.querySelector("#clienNom");
const $clienCod = document.querySelector("#clienCod");

const $cod = document.querySelector("#Cod");
const $nom = document.querySelector("#Nom");
const $categ = document.querySelector("#Categ");
const $cant = document.querySelector("#Cant");

function limpiar(){
  $cod.value = "";
  $nom.value = "";
  $categ.value = "";
  $cant.value = "";
}

function empleado(){
    listar(`usuarios`)
        .then((x)=>{
          x.forEach((e) => {
              if (e.rol != "1") {  
                const $option = document.createElement("option");
                $option.setAttribute("value", e.id)
                if (e.nombre == "admin") {
                  $option.textContent = "";
                }
                else {
                  let full = e.nombre + " " + e.apellido;
                  $option.textContent =full;
                  $frag.appendChild($option);
                }
              }
            });
            $empleNom.appendChild($frag);
        })
}
$empleNom.addEventListener("change", () => {
    const selecion = $empleNom.options[$empleNom.selectedIndex];
    $empleCod.value = selecion.value;
});
empleado();

function cliente(){
    listar(`clientes`)
        .then((x)=>{
          x.forEach((e) => {
              if (e.rol != "1") {  
                const $option = document.createElement("option");
                $option.setAttribute("value", e.id)
                let full = e.nombre + " " + e.apellido;
                $option.textContent = full;
                $frag.appendChild($option);
              }
            });
            $clienNom.appendChild($frag);
        })
}
$clienNom.addEventListener("change", () => {
    const seleccion = $clienNom.options[$clienNom.selectedIndex];
    $clienCod.value = seleccion.value;
});
cliente();



