const API_PUBLISHER = 'http://localhost:3000/publisher';
const listaEditoriales = document.getElementById('lista-editoriales');
const formEditorial = document.getElementById('form-editorial');
const formTitleEditorial = document.getElementById('form-title-editorial');
const submitButtonEditorial = document.getElementById('submit-button-editorial');

let editandoEditorial = false;
let editorialEditandoId = null;

function cargarEditorial() {
  listaEditoriales.innerHTML = '';
  fetch(API_PUBLISHER)
    .then(res => res.json())
    .then(data => {
      data.forEach(editorial => {
        console.log('Editorial recibida:', editorial);
        
        const item = document.createElement('li');
        item.innerHTML = `<strong>${editorial.NAME}</strong>`;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => eliminarEditorial(editorial.ID);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => cargarFormularioEditorialParaEditar(editorial);

        item.appendChild(btnEliminar);
        item.appendChild(btnEditar);
        listaEditoriales.appendChild(item);
      });
    });
}

formEditorial.addEventListener('submit', e => {
  e.preventDefault();
  console.log("Formulario editorial enviado"); // Para debug

  const editorial = {
    id: document.getElementById('editorial-id').value,
    name: document.getElementById('publisher').value,
    booksid: document.getElementById('books_id').value,
  };

  const metodo = editandoEditorial ? 'PUT' : 'POST';
  const url = editandoEditorial ? `${API_PUBLISHER}/${editorialEditandoId}` : API_PUBLISHER;

  fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editorial)
  })
  .then(res => {
    if (res.ok) {
      formEditorial.reset();
      editandoEditorial = false;
      editorialEditandoId = null;
      formTitleEditorial.textContent = 'Agregar Editorial';
      submitButtonEditorial.textContent = 'Agregar';
      cargarEditorial();
    } else {
      console.error("Error al guardar editorial");
    }
  });
});

function eliminarEditorial(id) {
  fetch(`${API_PUBLISHER}/${id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (res.ok) cargarEditorial();
  });
}

function cargarFormularioEditorialParaEditar(editorial) {
  document.getElementById('editorial-id').value = editorial.ID;
  document.getElementById('publisher').value = editorial.NAME;
  document.getElementById('books_id').value = editorial.BOOKSID;

  editandoEditorial = true;
  editorialEditandoId = editorial.ID;
  formTitleEditorial.textContent = 'Editar Editorial';
  submitButtonEditorial.textContent = 'Guardar Cambios';
}

cargarEditorial();
