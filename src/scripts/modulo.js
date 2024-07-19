export const usuario = async () =>{
  const data = await fetch(`http://127.0.0.1:3000/usuarios`)
  const info = await data.json();
  return info;
}
