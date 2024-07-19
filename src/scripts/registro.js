import { usuario, register } from "./modulo.js";

let linkHome = "home-venta.html";

const $cancelar = document.querySelector("#cancelar");

$cancelar.addEventListener("click", function (){
    location.href = linkHome;
})

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


const enviar = (event)=>{
    event.preventDefault();
    let dni = $dni.value.trim();
    let user = $user.value.trim();
    let last = $last.value.trim();
    let contra = $contra.value.trim();
    let contraC = $contraC.value.trim();
    let rol = $rol.value.trim();

    if(dni == "" ||user == "" || last == "" || contra == "" || contraC == "" ){
        alert("ERROR: Todos los campos son obligatorios");
    }
    else{
        if(!isNaN(dni)){
            if(isNaN(user)){
                if(isNaN(last)){
                    if(contra == contraC){
                        if(rol != "pre"){
                            const datos = {
                                id: dni,
                                nombre: user,
                                apellido: last,
                                password: contra,
                                rol: rol
                            }
                            alert("Usuario ingresado correctamente");
                            register(datos);
                        }
                        else{
                            alert("ERROR: Seleccion un ROL");
                            $rol.classList.add("error");
                            $icon6.classList.add("error__icon");
                        }
                    }
                    else{
                        alert("ERROR: Las CONTRASEÑAS no coiciden")
                        $contra.classList.add("error");
                        $contraC.classList.add("error");
                        $icon4.classList.add("error__icon");
                        $icon5.classList.add("error__icon");
                    }
                }
                else{
                    alert("ERROR: El APELLIDO no es valido");
                    $last.classList.add("error");
                    $icon2.classList.add("error__icon");
                }
            }
            else{
                alert("ERROR: El USUARIO no es valido");
                $user.classList.add("error");
                $icon.classList.add("error__icon");
            }
        }
        else{
            alert("ERROR: El DOCUMENTO no es valido");
            $dni.classList.add("error");
            $icon3.classList.add("error__icon");
        }
    }
}

$form.addEventListener("submit", enviar);