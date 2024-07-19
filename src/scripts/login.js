import { usuario } from "./modulo.js";

let usuarios;
let linkHome = "src/home-venta.html";

const $boton = document.querySelector("#login");
const $user = document.querySelector("#user");
const $contra = document.querySelector("#contra");
const $form = document.querySelector("#form");
const $link = document.querySelector("#login > a")

const validar = (event) => {
  event.preventDefault();
  let user = $user.value.trim();
  let passw = $contra.value;
  if (user == "" || passw == "") {
    alert("Rellene todos los campos")
  }
  else {
    usuario()
      .then((r) => {
        r.forEach((x) => {
          if (user == x.nombre && passw == x.password) {
            location.href = linkHome;
          }
        }); 
      })
      .catch(
        (error) => {
          alert(error)
        }
      )
  }
}

$form.addEventListener('submit', validar)