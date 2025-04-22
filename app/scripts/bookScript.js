    const API_URL = 'http://localhost:3000/books';
    const lista = document.getElementById('lista-libros');
    const form = document.getElementById('form-libro');
    const formTitle = document.getElementById('form-title');
    const submitButton = document.getElementById('submit-button');

    let editando = false;
    let libroEditandoId = null;

    function cargarLibros() {
      lista.innerHTML = '';
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          data.forEach(libro => {
            const item = document.createElement('li');
            item.innerHTML = `
              <strong>${libro.TITLE}</strong><br>
              Calificación: ${libro.RATING}<br>
              Páginas: ${libro.TOTAL_PAGES}<br>
              Fecha de publicación: ${libro.PUBLISHED_DATE}
            `;

            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.onclick = () => eliminarLibro(libro.ID);

            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.onclick = () => cargarFormularioParaEditar(libro);

            item.appendChild(btnEliminar);
            item.appendChild(btnEditar);
            lista.appendChild(item);
          });
        });
    }

    form.addEventListener('submit', e => {
      e.preventDefault();

      const libro = {
        id: document.getElementById('id').value, 
        title: document.getElementById('title').value,
        rating: parseInt(document.getElementById('rating').value),
        total_pages: parseInt(document.getElementById('total_pages').value),
        published_date: document.getElementById('published_date').value,
        genre_id: parseInt(document.getElementById('genre_id').value),
        authors_id: parseInt(document.getElementById('authors_id').value)
      };


      const metodo = editando ? 'PUT' : 'POST';
      const url = editando ? `${API_URL}/${libroEditandoId}` : API_URL;


      console.log('Datos a enviar:', libro);

      fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libro)
      })
      .then(res => {
        if (res.ok) {
          form.reset();
          editando = false;
          libroEditandoId = null;
          formTitle.textContent = 'Agregar Libro';
          submitButton.textContent = 'Agregar';
          cargarLibros();
        }
      });
    });

    function eliminarLibro(id) {
      fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      .then(res => {
        if (res.ok) cargarLibros(); // Vuelve a cargar la lista si se eliminó con éxito
      });
    }


    function cargarFormularioParaEditar(libro) {
      document.getElementById('id').value = libro.ID;
      document.getElementById('title').value = libro.TITLE;
      document.getElementById('rating').value = libro.RATING;
      document.getElementById('total_pages').value = libro.TOTAL_PAGES;
      document.getElementById('published_date').value = libro.PUBLISHED_DATE;
      document.getElementById('genre_id').value = libro.GENRE_ID;
      document.getElementById('authors_id').value = libro.AUTHORS_ID;


      editando = true;
      libroEditandoId = libro.ID;
      formTitle.textContent = 'Editar Libro';
      submitButton.textContent = 'Guardar Cambios';
    }

    cargarLibros();