export const usuarios = async (id) => {
  const rest = await fetch(`src/scripts/user.json/${id}`);
  const resp = await rest.json();
  return resp
}