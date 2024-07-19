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