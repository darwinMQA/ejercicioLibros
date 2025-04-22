const API_GENRE = 'http://localhost:3000/genre';
const listaGeneros = document.getElementById('lista-generos');
const formGenero = document.getElementById('form-genero');
const formTitleGenero = document.getElementById('form-title-genero');
const submitButtonGenero = document.getElementById('submit-button-genero');

let editandoGenero = false;
let generoEditandoId = null;

function cargarGeneros() {
  listaGeneros.innerHTML = '';
  fetch(API_GENRE)
    .then(res => res.json())
    .then(data => {
      data.forEach(genero => {
        console.log('Genero recibido:', genero);
        
        const item = document.createElement('li');
        item.innerHTML = `<strong>${genero.GENRE}</strong>`;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => eliminarGenero(genero.ID);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => cargarFormularioGeneroParaEditar(genero);

        item.appendChild(btnEliminar);
        item.appendChild(btnEditar);
        listaGeneros.appendChild(item);
      });
    });
}

formGenero.addEventListener('submit', e => {
  e.preventDefault();
  console.log("Formulario genero enviado"); // Para debug

  const genero = {
    id: document.getElementById('genero-id').value,
    genre: document.getElementById('genre').value,
  };

  const metodo = editandoGenero ? 'PUT' : 'POST';
  const url = editandoGenero ? `${API_GENRE}/${generoEditandoId}` : API_GENRE;

  fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(genero)
  })
  .then(res => {
    if (res.ok) {
      formGenero.reset();
      editandoGenero = false;
      generoEditandoId = null;
      formTitleGenero.textContent = 'Agregar Genero';
      submitButtonGenero.textContent = 'Agregar';
      cargarGeneros();
    } else {
      console.error("Error al guardar genero");
    }
  });
});

function eliminarGenero(id) {
  fetch(`${API_GENRE}/${id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (res.ok) cargarGeneros();
  });
}

function cargarFormularioGeneroParaEditar(genero) {
  document.getElementById('genero-id').value = genero.ID;
  document.getElementById('genre').value = genero.GENRE;

  editandoGenero = true;
  generoEditandoId = genero.ID;
  formTitleGenero.textContent = 'Editar Genero';
  submitButtonGenero.textContent = 'Guardar Cambios';
}

cargarGeneros();
