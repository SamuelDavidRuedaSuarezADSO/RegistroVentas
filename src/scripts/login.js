import { usuario } from "../modulos/modulo.js";
import { ver } from "../modulos/numeros.js";


let linkHome = "src/home-venta.html";

const $user = document.querySelector("#user");
const $contra = document.querySelector("#contra");
const $form = document.querySelector("#form");
const $icon = document.querySelector(".icono");
const $label = document.querySelector(".login__label");
const $label2 = document.querySelector("#label");
const $error = document.querySelector(".login__error");
const $error2 = document.querySelector("#error");
const $icon2 = document.querySelector("#candado");


const validar = (event) => {
  event.preventDefault();
  let user = $user.value.trim();
  let passw = $contra.value.trim();
  if (user == "" || passw == "") {
    alert("Rellene todos los campos")
  }
  else {
    
    if(!isNaN(user)){    
      usuario()
        .then((r) => {
          r.forEach((x) => {
            if (user == x.id && passw == x.password) {
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
    else{
      alert("El DOCUMENTO no es valido");
    }
  }
}

// const ver = (event)=>{
//   // let regex = new RegExp("^[0-9]+$");
//   let regex = /^[0-9]+$/;
//   if (!regex.test(event.key) || $user.value.length >= 10) { 
//     event.preventDefault();
//     $user.classList.add("error");
//     $icon.classList.add("error__icon");
//   } else {
//     $icon.classList.add("bien__icon");
//     $user.classList.add("bien");
//   }
// }

$user.addEventListener("keypress",  (event) => {
  ver(event, $user, $icon)
});


$form.addEventListener('submit', validar)