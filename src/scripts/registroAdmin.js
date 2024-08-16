import { registrar, listar } from "../modulos/modulo.js";
import {soloNumeros} from "../modulos/numeros.js";
import requeridos from "../modulos/requiere.js"

let linkHome = "home-ventaAdmin.html";


const $cancelar = document.querySelector("#cancelar");
const $form = document.querySelector("#form");
const $user = document.querySelector("#user");
const $last = document.querySelector("#last");
const $dni = document.querySelector("#dni");
const $contra = document.querySelector("#contra");
const $contraC = document.querySelector("#contraC");
const $rol = document.querySelector("#rol");
const $icon = document.querySelector(".icon");
const $icon2 = document.querySelector(".icon2");
const $icon3 = document.querySelector(".icon3");
const $icon4 = document.querySelector(".icon4");
const $icon5 = document.querySelector(".icon5");
const $icon6 = document.querySelector(".icon6");

function error(){
    $dni.classList.add("error");
    $icon3.classList.add("error__icon");
    $user.classList.add("error");
    $icon.classList.add("error__icon");
    $last.classList.add("error");
    $icon2.classList.add("error__icon");
    $contra.classList.add("error");
    $contraC.classList.add("error");
    $icon4.classList.add("error__icon");
    $icon5.classList.add("error__icon");
    $rol.classList.add("error");
    $icon6.classList.add("error__icon");
}

function limpiar(){
    $dni.value = "";
    $user.value = "";
    $last.value = "";
    $contra.value = "";
    $contraC.value = "";
    $rol.value = "pre";
}

function roles(){
    listar(`roles`)
        .then((x)=>{
            x.forEach((a)=>{
                if(a.id != "1"){
                    const option = document.createElement("option")
                    option.setAttribute("value", a.id)
                    option.innerText = a.name;
                    $rol.appendChild(option);
                }
            })
        })
}
roles();

$dni.addEventListener("keypress", (event) => {
    soloNumeros(event, $dni, $icon3)
})

$cancelar.addEventListener("click", ()=>{
    location.href = linkHome;
})

$form.addEventListener("submit", (event)=>{
    event.preventDefault();
    let resp = requeridos(event, "#form [required]");
    let existe = false;
    if(resp){
        if($rol.value != "pre"){
            listar(`usuarios`)
                .then((x)=>{              
                    x.forEach((a)=>{
                        if($dni.value === a.id){
                            existe = true;
                        }  
                    })
                    if(existe){
                        alert("ERROR: este USUARIO ya existe");
                        error();
                    }
                    else{
                        const datos = {
                            id: $dni.value,
                            nombre: $user.value,
                            apellido: $last.value,
                            password: $contra.value,
                            rol: $rol.value
                        }
                        alert("Usuario ingresado correctamente");
                        registrar(datos, `usuarios`);
                        limpiar();
                    }     
                })
            }
            else{
                alert("ERROR: Seleccione un ROL");
                $rol.classList.add("error");
                $icon6.classList.add("error__icon");
            }
        }
    else{
        error();
    }
});

