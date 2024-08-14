import { buscar, eliminar, modificar, listar, registrar } from "../modulos/modulo.js";
import { soloNumeros } from "../modulos/numeros.js";
import requeridos from "../modulos/requiere.js";

const $frag = document.createDocumentFragment();
const $frag2 = document.createDocumentFragment();

const $empleNom = document.querySelector("#empleNom");
const $empleCod = document.querySelector("#empleCod");
const $clienNom = document.querySelector("#clienNom");
const $clienCod = document.querySelector("#clienCod");
const $cod = document.querySelector("#Cod");
const $nom = document.querySelector("#Nom");
const $color = document.querySelector("#Color");
const $categ = document.querySelector("#Categ");
const $prec = document.querySelector("#Pre");
const $stock = document.querySelector("#Stock");
const $cant = document.querySelector("#Cant");
const $searchForm = document.querySelector("#search");
const $searchInput = document.querySelector("#input");
const $form = document.querySelector("#form");
const $table = document.querySelector("#tbody");
const $total = document.querySelector("#totalF");
const $open = document.getElementById('open');
const $modal = document.getElementById('detall');
const $close = document.getElementById('close');
const $empleado = document.querySelector("#emple");
const $cliente = document.querySelector("#client");
const $totPaga = document.querySelector("#totPaga");
const $pagaCon = document.querySelector("#pagaCon");

function limpiar(){
  $cod.value = "";
  $nom.value = "";
  $color.value = "";
  $categ.value = "";
  $prec.value = "";
  $stock.value = "";
  $cant.value = "0";
  $searchInput.value = "";
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
empleado();
$empleNom.addEventListener("change", () => {
    const selecion = $empleNom.options[$empleNom.selectedIndex];
    $empleCod.value = selecion.value;
});
function cliente(){
    listar(`clientes`)
        .then((x)=>{
          x.forEach((e) => {
              const $option = document.createElement("option");
              $option.setAttribute("value", e.id)
              let full = e.nombre + " " + e.apellido;
              $option.textContent = full;
              if (e.id == 1) {
                $option.setAttribute("selected", "selected");
                $clienCod.value = e.id;
              }
              $frag.appendChild($option);
            });
            $clienNom.appendChild($frag);
        })
}
cliente();

$clienNom.addEventListener("change", () => {
  const seleccion = $clienNom.options[$clienNom.selectedIndex];
  $clienCod.value = seleccion.value;
  console.log($clienNom.value);
});

$searchInput.addEventListener("keypress",(event)=>{
    soloNumeros(event, $searchInput);
})

$cant.addEventListener("keypress", (event)=>{
    soloNumeros(event, $cant)
})

$pagaCon.addEventListener("keypress", (event)=>{
    soloNumeros(event, $pagaCon);
})

$searchForm.addEventListener("submit", (event)=>{
  event.preventDefault();
  let algo = requeridos(event, "#search [required]");
  if(algo){      
      buscar($searchInput.value, `muebles`)
        .then((data)=>{
          $cod.value = data.id;
          $nom.value = data.nombre;
          $color.value = data.color;
          
          buscar(data.cod_categ, `categoria`)
            .then((c)=>{
              $categ.value = c.id + " - " + c.nombre;
            })
          
          $prec.value = data.precio;
          $stock.value = data.stock;
          if(data.stock == 0){
            alert("ERROR: No hay STOCK disponible en este momento");
          }
        })
        .catch((error)=>{
          alert("ERROR: Mueble no encontrado");
          console.error("ERROR: ", error);
          
        })
  }
})

$form.addEventListener("submit", (event)=>{
  let algo = requeridos(event, "#form [required]");
  if(algo){
    if($cant.value != 0 && $cant.value > 0){
      let cantidad = parseInt($cant.value);
      let stock = parseInt($stock.value);
      let precio = parseInt($prec.value);
      if(cantidad <=    stock){
        const tr = document.createElement("tr");
        const cod = document.createElement("td");
        const nom = document.createElement("td");
        const col = document.createElement("td");
        const cad = document.createElement("td");
        const vaU = document.createElement("td");
        const vaT = document.createElement("td");
        const boton = document.createElement("td");
        const eli = document.createElement("button");

        cod.textContent = $cod.value;
        nom.textContent = $nom.value;
        col.textContent = $color.value;
        cad.textContent = cantidad;
        vaU.textContent = precio; 
        vaT.textContent = precio * cantidad;
        eli.textContent = "ELIMINAR";

        tr.setAttribute("id", `mueble_${$cod.value}`);

        tr.classList.add("table__body");
        cod.classList.add("table__body");
        nom.classList.add("table__body");
        col.classList.add("table__body");
        cad.classList.add("table__body");
        vaU.classList.add("table__body");
        vaT.classList.add("table__body");
        boton.classList.add("table__body");
        eli.classList.add("boton"); 

        cod.classList.add("table--primer");
        nom.classList.add("table--name");
        col.classList.add("table--segundo");
        cad.classList.add("table--segundo");
        vaU.classList.add("table--segundo");
        vaT.classList.add("table--segundo");
        boton.classList.add("table--last");
        eli.classList.add("delete");

        boton.appendChild(eli)
        tr.appendChild(cod);
        tr.appendChild(nom);
        tr.appendChild(col);
        tr.appendChild(cad);
        tr.appendChild(vaU);
        tr.appendChild(vaT);
        tr.appendChild(boton);
        
        $frag2.appendChild(tr);
        $table.appendChild($frag2);
        limpiar();
        
        let tb = $table.children;
        let precioT = 0;
        let precioU = 0;
        let pres = 0;
        
        for(let i = 0; i<$table.childElementCount; i++){
          let hijo = tb[i].children;
          for(let o = 0; o<tb[i].childElementCount; o++){
            precioU = hijo[5].textContent;
            pres = parseInt(precioU);
          }
          precioT = precioT + pres
        }
        $total.textContent = precioT;
        
        $open.addEventListener('click', () => {
          $modal.style.display = 'block';

          let tb2 = $table.children;
          for(let r = 0; r<tb2.length; r++){
            // let son = tb2[r].children;
            console.log(tb2[r]);  
            
            

          }

          buscar($empleCod.value, `usuarios`)
            .then((datos)=>{
              $empleado.value = datos.nombre + " " + datos.apellido;
            })

          buscar($clienCod.value, `clientes`)
            .then((data)=>{
              $cliente.value = data.nombre + " " + data.apellido;
            })

          $totPaga.value = precioT;
        });
        
        $close.addEventListener('click', () => {
          $modal.style.display = 'none';
        });
        
        eli.addEventListener("click", (event)=>{
          event.preventDefault();
          tr.remove();
          if(tb.length == 0){
            $total.textContent = "";
          }          
        });
      }
      else{
        alert("ERROR: No hay STOCK disponible");
      }
    }
    else{
      alert("ERROR: La CANTIDAD no es valida");
    }
  }
  else{
    alert("ERROR: Algunos campos estan VACIOS");
  }
})





