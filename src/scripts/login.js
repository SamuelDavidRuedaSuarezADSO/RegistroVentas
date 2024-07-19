import { usuarios } from "./modulo.js";

let linkHome = "src/home-venta.html";

const $boton = document.querySelector("#login");
const $user = document.querySelector("#user");
const $contra = document.querySelector("#contra");
const $form = document.querySelector("#form");
const $link = document.querySelector("#login > a")

const validar = (event) => {
  event.preventDefault();
  let usuario = $user.values.trim();
  let passw = $contra.values.trim();
  console.log(usuario)
  if (usuario == "" || passw == "") {
    alert("Rellene todos los campos")
  }
  else {
    usuarios(id)
      .then((response) => {
        if (usuario == response.user && passw == response.contraseña) {
          alert("entro")
        }
        else {
          alert("no valido")
        }
      }
      )
  }
}

$form.addEventListener('submit', validar)