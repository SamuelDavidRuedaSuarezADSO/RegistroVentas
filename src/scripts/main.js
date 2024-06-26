let fechaActual = new Date();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('fecha').textContent = fechaActual.toLocaleDateString('es-ES', options);

//menu hamburquesa

function toggleMenu() {
  let sidebar = document.getElementById("sidebar");
  if (sidebar.style.width === "200px") {
    sidebar.style.width = "0";
  } else {
    sidebar.style.width = "200px";
  }
}