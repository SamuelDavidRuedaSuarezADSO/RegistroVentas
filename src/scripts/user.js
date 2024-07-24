import { usuario, rol, eliminar, modificar, listRol } from "../modulos/modulo.js";

const $table = document.querySelector("#tbody");
const $frag = document.createDocumentFragment();
const $frag2 = document.createDocumentFragment();

const $form = document.querySelector("#form");
const $dni = document.querySelector("#empleCod");
const $name = document.querySelector("#empleNom");
const $last = document.querySelector("#empleLast");
const $rol = document.querySelector("#codRol");
const $contra = document.querySelector("#contraEmple");

const roles = ()=>{
    listRol()
        .then((f)=>{
            f.forEach((s)=>{
                    const op = document.createElement("option");
                    op.value = s.id;
                    op.textContent = s.name;
                    $frag2.appendChild(op);
                    $rol.append($frag2)
            })
        })
}
roles();
const list = () =>{
    usuario()
        .then((e)=>{
            e.forEach((x)=>{
                const tr = document.createElement("tr");
                const id = document.createElement("td");
                const name = document.createElement("td");
                const last = document.createElement("td");
                const adm = document.createElement("td");
                const contra = document.createElement("td");
                const botones = document.createElement("td");
                const drop = document.createElement("button");
                const modi = document.createElement("button");

                drop.textContent = "ELIMINAR";
                modi.textContent = "MODIFICAR";

                id.textContent = x.id;
                name.textContent = x.nombre;
                last.textContent = x.apellido;
                contra.textContent = x.password;

                tr.classList.add("table__body");
                id.classList.add("table__body");
                id.classList.add("table--primer");
                name.classList.add("table__body");
                name.classList.add("table--name");
                last.classList.add("table__body");
                last.classList.add("table--segundo");
                adm.classList.add("table__body");
                adm.classList.add("table--segundo");
                contra.classList.add("table__body");
                contra.classList.add("table--segundo");
                botones.classList.add("table__body");
                botones.classList.add("table--last");

                drop.classList.add("boton");
                drop.classList.add("delete");
                modi.classList.add("boton");
                modi.classList.add("modi");

                let dni = x.id;

                rol(x.rol)
                    .then((h)=>{
                        adm.textContent = h.name;
                    })

                drop.addEventListener("click", ()=>{
                    eliminar(dni)
                    location.reload();
                })
                
                tr.appendChild(id);
                tr.appendChild(name);
                tr.appendChild(last);
                tr.appendChild(adm);
                tr.appendChild(contra);
                botones.appendChild(drop)
                botones.appendChild(modi)
                tr.appendChild(botones)
                $frag.appendChild(tr);
                $table.appendChild($frag);

                // console.log(contra.textContent)

                modi.addEventListener("click", (event)=>{
                    event.preventDefault();
                    $dni.value = id.textContent;
                    $name.value = name.textContent;
                    $last.value = last.textContent;
                    $contra.value = contra.textContent;
                })            
            })
        })
}

list();

const modi = () =>{

}
$form