import { listar } from "../modulos/modulo.js";
import { soloNumeros } from "../modulos/numeros.js";
import requeridos from "../modulos/requiere.js"


let linkHome = "src/home-venta.html";

const $user = document.querySelector("#user");
const $contra = document.querySelector("#contra");
const $form = document.querySelector("#form");
const $icon = document.querySelector(".icono");
const $error = document.querySelector(".login__error");
const $error2 = document.querySelector("#error");
const $icon2 = document.querySelector("#candado");


function errores(){
  $user.classList.add("error");
  $contra.classList.add("error");
  $icon.classList.add("error__icon");
  $icon2.classList.add("error__icon");
  $user.value ="";
  $contra.value ="";
  $error.classList.remove("login__error");
  $error2.classList.remove("login__error");
  $error.classList.add("error__icon");
  $error2.classList.add("error__icon");
}

$user.addEventListener("keypress",  (event) => {
  soloNumeros(event, $user, $icon)
});

$form.addEventListener('submit', (event)=>{
  let exist = false;
  let resp = requeridos(event, "#form [required]");
  if (resp){
    listar(`usuarios`)
        .then((r) => {
          r.forEach((x) => {
            let user = $user.value;
            let passw = $contra.value;
            console.log(user);
            console.log(passw);
            console.log(exist);
            if (user == x.id && passw == x.password) {
              exist = true;       
            }
          }); 
          if(exist){
            location.href = linkHome;
          }
          else{
            alert("hola");
            errores();
          }
        })
  }
  else{
    console.error("ERROR: LOS CAMPOS ESTAN VACIOS");
    errores();
  }
});
