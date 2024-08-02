import { listar, buscar, eliminar, modificar } from "../modulos/modulo.js";

const $table = document.querySelector("#tbody");
const $frag = document.createDocumentFragment();
const $frag2 = document.createDocumentFragment();

const $form = document.querySelector("#form");
const $dni = document.querySelector("#empleCod");
const $name = document.querySelector("#empleNom");
const $last = document.querySelector("#empleLast");
const $rol = document.querySelector("#codRol");
const $contra = document.querySelector("#contraEmple");
const $elimi = document.querySelector("#eliminar");

const $search = document.querySelector("#search");
const $input = document.querySelector("#input");

function limpiar(){
  $dni.value = "";
  $name.value = "";
  $last.value = "";
  $contra.value = "";
  $rol.value = "pre";
}


const roles = ()=>{
    listar(`roles`)
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
    listar(`usuarios`)
        .then((e)=>{
          e.forEach((x) => {
                let idrol;
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

                buscar(x.rol, `roles`)
                    .then((h)=>{
                      adm.textContent = h.id + " - " + h.name;
                      idrol = h.id;
                    })

                drop.addEventListener("click", ()=>{
                  let confirmar = confirm("¿Esta seguro de ELIMINAR este usuario?")
                  if(confirmar){
                    eliminar(dni, `usuarios`)
                    limpiar();
                  }
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


                modi.addEventListener("click", (event)=>{
                    event.preventDefault();
                    $dni.value = id.textContent;
                    $name.value = name.textContent;
                    $last.value = last.textContent;
                    $contra.value = contra.textContent;
                    $rol.value = idrol;
                })            
            })
        })
}

list();

const modi = (event) => {
  event.preventDefault();
  if ($dni.value != "" || $name.value != "" || $last.value != "" || $contra.value != "") {
    if ($rol.value != "pre") {

      const datos = {
        nombre: $name.value,
        apellido: $last.value,
        password: $contra.value,
        rol: $rol.value
      }
      
      modificar($dni.value, datos, `usuarios`);

      limpiar();

      

    } else {
      alert("ERROR: Seleccione un rol");
    }
  } else {
    alert("ERROR: Seleccione un USUARIO");
  }
}

$form.addEventListener("submit", modi);


$elimi.addEventListener("click", () => {
  if ($dni.value != "" || $name.value != "" || $last.value != "" || $contra.value != "") {
    if ($rol.value != "pre") {      
      eliminar($dni.value, `usuarios`)
      limpiar();
    }else {
      alert("ERROR: Seleccione un rol");
    }
  }else {
    alert("ERROR: Seleccione un USUARIO");
  }
})

const busqueda = (event) => {
  event.preventDefault();

  limpiar();

  if ($input.value != "") {
    buscar($input.value, `usuarios`)
      .then((g) => {
        $dni.value = g.id;
        $name.value = g.nombre;
        $last.value = g.apellido;
        $contra.value = g.password;
        $rol.value = g.rol;
      })
      .catch((error) => {
        console.error("ERROR: ", error);
          alert("ERROR: No se encontro ningun usuario")
      })
  }
  else {
    alert("ERROR: No se ingreso nada en el buscador")
  }

}

$search.addEventListener("submit", busqueda);