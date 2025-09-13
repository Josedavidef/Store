let productos = [];
let editando = null;

const modal = document.getElementById("modal");
const btnAgregar = document.getElementById("btn-agregar");
const btnGuardar = document.getElementById("btn-guardar");
const btnCancelar = document.getElementById("btn-cancelar");
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const modalTitulo = document.getElementById("modal-titulo");
const tabla = document.getElementById("tabla-productos");

btnAgregar.addEventListener("click", () => {
  editando = null;
  modalTitulo.textContent = "Nuevo producto";
  inputNombre.value = "";
  inputPrecio.value = "";
  modal.style.display = "flex";
});

btnCancelar.addEventListener("click", () => {
  modal.style.display = "none";
});

btnGuardar.addEventListener("click", () => {
  const nombre = inputNombre.value.trim();
  const precio = parseFloat(inputPrecio.value);

  if (nombre === "" || isNaN(precio) || precio <= 0) {
    alert("Por favor ingresa un nombre y un precio válido.");
    return;
  }

  if (editando !== null) {
    productos[editando] = { nombre, precio };
    editando = null;
  } else {
    productos.push({ nombre, precio });
  }

  modal.style.display = "none";
  renderTabla();
});

function renderTabla() {
  tabla.innerHTML = "";
  let subtotal = 0;

  productos.forEach((p, index) => {
    const iva = p.precio * 0.19;
    const total = p.precio + iva;
    subtotal += p.precio;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.nombre}</td>
      <td>$${p.precio.toLocaleString()}</td>
      <td>$${iva.toLocaleString()}</td>
      <td>$${total.toLocaleString()}</td>
      <td>
        <button class="btn" onclick="editar(${index})">Editar</button>
        <button class="btn rojo" onclick="eliminar(${index})">Eliminar</button>
      </td>
    `;
    tabla.appendChild(row);
  });

  const ivaTotal = subtotal * 0.19;
  document.getElementById("subtotal").textContent = `$${subtotal.toLocaleString()}`;
  document.getElementById("iva").textContent = `$${ivaTotal.toLocaleString()}`;
  document.getElementById("total").textContent = `$${(subtotal + ivaTotal).toLocaleString()}`;
}

function editar(index) {
  editando = index;
  const p = productos[index];
  inputNombre.value = p.nombre;
  inputPrecio.value = p.precio;
  modalTitulo.textContent = "Editar producto";
  modal.style.display = "flex";
}

function eliminar(index) {
  productos.splice(index, 1);
  renderTabla();
}
