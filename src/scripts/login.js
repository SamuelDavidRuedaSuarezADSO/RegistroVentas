import { usuario } from "./modulo.js";

let linkHome = "src/home-venta.html";

const $user = document.querySelector("#user");
const $contra = document.querySelector("#contra");
const $form = document.querySelector("#form");
const $icon = document.querySelector(".login__icon");
const $icon2 = document.querySelector("#candado");
const $label = document.querySelector(".login__label");
const $label2 = document.querySelector("#label");
const $error = document.querySelector(".login__error");
const $error2 = document.querySelector("#error");

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
          else{
            $user.classList.add("error");
            $contra.classList.add("error");
            $icon.classList.add("error__icon");
            $icon2.classList.add("error__icon");
            $label.classList.add("error__icon");
            $label2.classList.add("error__icon");
            $user.value ="";
            $contra.value ="";
            $error.classList.remove("login__error");
            $error2.classList.remove("login__error");
            $error.classList.add("error__icon");
            $error2.classList.add("error__icon");
          }
        }); 
      })
      .catch(
        (error) => {
          console.error(error);
        }
      )
  }
}

$form.addEventListener('submit', validar)