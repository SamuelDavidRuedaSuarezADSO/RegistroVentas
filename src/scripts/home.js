import { usuario , clientes } from "./modulo.js";

const $frag = document.createDocumentFragment();
const $empleNom = document.querySelector("#empleNom");
const $empleCod = document.querySelector("#empleCod");
const $clienNom = document.querySelector("#clienNom");
const $clienCod = document.querySelector("#clienCod");

function nombre(){
    usuario()
        .then((x)=>{
          x.forEach((e) => {
              if (e.rol != "1") {  
                const $option = document.createElement("option");
                $option.setAttribute("value", e.id)
                if (e.nombre == "admin") {
                  $option.textContent = "";
                }
                else {
                  $option.textContent = e.nombre;
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
nombre();

function cliente(){
    clientes()
        .then((x)=>{
          x.forEach((e) => {
              if (e.rol != "1") {  
                const $option = document.createElement("option");
                $option.setAttribute("value", e.id)
                $option.textContent = e.nombre;
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
