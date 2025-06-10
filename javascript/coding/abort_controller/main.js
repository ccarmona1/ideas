const controller = new AbortController();
const signal = controller.signal;

fetch('https://jsonplaceholder.typicode.com/posts', { signal })
  .then(response => response.json())
  .then(data => console.log('Datos recibidos:', data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('La petición fue cancelada');
    } else {
      console.error('Error en la petición:', err);
    }
  });

// Cancelar la petición después de 100ms
setTimeout(() => controller.abort(), 100);