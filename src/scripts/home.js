import { buscar, eliminar, modificar, listar, registrar } from "../modulos/modulo.js";
import { soloNumeros } from "../modulos/numeros.js";
import requeridos from "../modulos/requiere.js";

const $frag = document.createDocumentFragment();
const $frag2 = document.createDocumentFragment();
const $frag3 = document.createDocumentFragment();

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
const $tablaD = document.querySelector("#tablaD");
const $fomrDetalls = document.querySelector("#fomrDetalls");
const $deleteAll = document.querySelector("#deleteAll");

function limpiar(){
  $cod.value = "";
  $nom.value = "";
  $color.value = "";
  $categ.value = "";
  $prec.value = "";
  $stock.value = "";
  $cant.value = "0";
  $empleCod.value = "";
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

$deleteAll.addEventListener("click", (event) => {
  window.location.reload();
  limpiar();
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
          for(let r = 0; r < tb2.length; r++){
            let son = tb2[r].children;
            const trD = document.createElement("tr");
            trD.classList.add("table__body");

            const codD = document.createElement("td");
            const nomD = document.createElement("td");
            const cantD = document.createElement("td");
            const vUD = document.createElement("td");
            const vTD = document.createElement("td");

            codD.textContent = son[0].textContent;
            nomD.textContent = son[1].textContent;
            cantD.textContent = son[3].textContent;
            vUD.textContent = son[4].textContent;
            vTD.textContent = son[5].textContent;

            codD.classList.add("table__body", "table--primer");
            nomD.classList.add("table__body", "table--segundo");
            cantD.classList.add("table__body", "table--segundo");
            vUD.classList.add("table__body", "table--segundo");
            vTD.classList.add("table__body", "table--segundo");

            trD.appendChild(codD);
            trD.appendChild(nomD);
            trD.appendChild(cantD);
            trD.appendChild(vUD);
            trD.appendChild(vTD);

            $frag3.appendChild(trD);
          }
          $tablaD.innerHTML = '';
          
          $tablaD.appendChild($frag3);

          buscar($empleCod.value, `usuarios`).then((datos) => {
            $empleado.value = datos.id + " - " + datos.nombre + " " + datos.apellido;
          });

          buscar($clienCod.value, `clientes`).then((data) => {
            $cliente.value = data.id + " - " + data.nombre + " " + data.apellido;
          });

          $totPaga.value = precioT;
          $pagaCon.value = precioT;
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

$fomrDetalls.addEventListener("submit", async (event) => {
  event.preventDefault();

  let algo = requeridos(event, "#fomrDetalls [required]");
  if (algo) {
    let totalP = parseInt($totPaga.value);
    let pagaP = parseInt($pagaCon.value);

    if (pagaP > 0) {
      if (totalP <= pagaP) {
        const muebleData = [];
        let tb3 = $tablaD.children;

        try {
          const promises = Array.from(tb3).map(async row => {
            let son3 = row.children;
            let mueble = son3[0].textContent;

            let d = await buscar(mueble, 'muebles');
            let id = d.id;
            let nombre = d.nombre;
            let cod_categ = d.cod_categ;
            let color = d.color;
            let material = d.material;
            let precio = d.precio;
            let stock = d.stock;

            muebleData.push({
              id,
              nombre,
              cod_categ,
              color,
              material,
              precio,
              stock
            });
          });

          await Promise.all(promises);

          let cambio = pagaP - totalP;

          const codEmp = $empleado.value.match(/^\d+/)[0];
          const codCli = $cliente.value.match(/^\d+/)[0];

          const newPedido = {
            empleado: codEmp,
            cliente: codCli,
            contenido: muebleData,
            total: totalP,
            paga: pagaP,
            cambio: cambio
          };

          await registrar(newPedido, 'Pedidos');

          const showAlert = (message) => {
            return new Promise((resolve) => {
              alert(message);
              resolve();
            });
          };

          await showAlert(cambio !== 0 ? `El cambio es: ${cambio}` : '');
          await showAlert("Venta registrada");

        } catch (error) {
          console.error('Error al registrar el pedido:', error);
          alert("Hubo un error al registrar la venta.");
        }

      } else {
        alert("ERROR: El valor ingresado no es suficiente para cerrar la compra");
      }
    } else {
      alert("ERROR: Valor no válido");
    }
  }
});



