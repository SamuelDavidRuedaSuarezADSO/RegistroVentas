import { URL } from "../../config.js";

export const registrar = async (data, direcc) =>{
  fetch(`${URL}${direcc}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export const listar = async (direcc)=>{ 
  const response = await fetch(`${URL}${direcc}`);
  const data = await response.json();
  return data;
}

export const eliminar = async (id, direcc)=>{
  fetch(`${URL}${direcc}/${id}`, {
    method: 'DELETE',
  });
}

export const modificar = async (id, data, direcc)=>{
  fetch(`${URL}${direcc}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export const buscar = async(id, direcc)=>{
  const response = await fetch(`${URL}${direcc}/${id}`);
  const data = await response.json();
  return data;
}