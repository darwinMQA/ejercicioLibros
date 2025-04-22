const API_AUTHORS = 'http://localhost:3000/authors';
const listaAutores = document.getElementById('lista-autores');
const formAutor = document.getElementById('form-autor');
const formTitleAutor = document.getElementById('form-title-autor');
const submitButtonAutor = document.getElementById('submit-button-autor');

let editandoAutor = false;
let autorEditandoId = null;

function cargarAutores() {
  listaAutores.innerHTML = '';
  fetch(API_AUTHORS)
    .then(res => res.json())
    .then(data => {
      data.forEach(autor => {
        console.log('Autor recibido:', autor);
        
        const item = document.createElement('li');
        item.innerHTML = `<strong>${autor.NAME} ${autor.SURNAME}</strong>`;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => eliminarAutor(autor.ID);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => cargarFormularioAutorParaEditar(autor);

        item.appendChild(btnEliminar);
        item.appendChild(btnEditar);
        listaAutores.appendChild(item);
      });
    });
}

formAutor.addEventListener('submit', e => {
  e.preventDefault();
  console.log("Formulario autor enviado"); // Para debug

  const autor = {
    id: document.getElementById('autor-id').value,
    name: document.getElementById('name').value,
    surname: document.getElementById('surname').value
  };

  const metodo = editandoAutor ? 'PUT' : 'POST';
  const url = editandoAutor ? `${API_AUTHORS}/${autorEditandoId}` : API_AUTHORS;

  fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(autor)
  })
  .then(res => {
    if (res.ok) {
      formAutor.reset();
      editandoAutor = false;
      autorEditandoId = null;
      formTitleAutor.textContent = 'Agregar Autor';
      submitButtonAutor.textContent = 'Agregar';
      cargarAutores();
    } else {
      console.error("Error al guardar autor");
    }
  });
});

function eliminarAutor(id) {
  fetch(`${API_AUTHORS}/${id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (res.ok) cargarAutores();
  });
}

function cargarFormularioAutorParaEditar(autor) {
  document.getElementById('autor-id').value = autor.ID;
  document.getElementById('name').value = autor.NAME;
  document.getElementById('surname').value = autor.SURNAME;

  editandoAutor = true;
  autorEditandoId = autor.ID;
  formTitleAutor.textContent = 'Editar Autor';
  submitButtonAutor.textContent = 'Guardar Cambios';
}

cargarAutores();
