export const usuario = async () =>{
  const data = await fetch(`http://127.0.0.1:3000/usuarios`)
  const info = await data.json();
  return info;
}

export const register = async (data) =>{
  fetch('http://127.0.0.1:3000/usuarios', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export const clientes = async () => {
  const response = await fetch(`http://127.0.0.1:3000/clientes`);
  const data = await response.json();
  return data;
}

export const rol = async (id) =>{
  const respuesta = await fetch(`http://127.0.0.1:3000/roles/${id}`);
  const res = await respuesta.json();
  return res;
}

export const eliminar = async (id)=>{
  fetch(`http://127.0.0.1:3000/usuarios/${id}`, {
    method: 'DELETE',
  });
}

export const modificar = async (data, id) =>{
  fetch(`http://127.0.0.1:3000/usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export const listRol = async () =>{
  const response = await fetch(`http://127.0.0.1:3000/roles`);
  const data = await response.json();
  return data;
}
export const eliminarCliente = async (id)=>{
  fetch(`http://127.0.0.1:3000/clientes/${id}`, {
    method: 'DELETE',
  });
}

export const modificarCliente = async (data, id) =>{
  fetch(`http://127.0.0.1:3000/clientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export const registerCliente = async (data) =>{
  fetch('http://127.0.0.1:3000/clientes', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export const clientesBuscar = async (id) => {
  const response = await fetch(`http://127.0.0.1:3000/clientes?id=${id}`);
  const data = await response.json();
  if(data.length > 0){
    return false;
  }
  return true;
}
