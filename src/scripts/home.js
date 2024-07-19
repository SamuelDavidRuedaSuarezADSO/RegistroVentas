import { usuario } from "./modulo.js";

const $frag = document.createDocumentFragment();
const $empleNom = document.querySelector("#empleNom");

function nombre(){
    usuario()
        .then((x)=>{
            x.forEach((e) => {
                const $option = document.createElement("option");
                $option.setAttribute("value", e.id)
                $option.textContent = e.nombre;
                $frag.appendChild($option);
            });
            $empleNom.appendChild($frag);
        })
}
nombre();
