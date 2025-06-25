const API_URL = 'https://megatvpro.ddns.net/api/auth/login';

document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value.trim();
  const clave = document.getElementById('clave').value.trim();

  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, clave })
    });

    if (respuesta.ok) {
      const datos = await respuesta.json();

      // Redirigir al panel correspondiente según el rol
      if (datos.rol === 'superadmin') {
        window.location.href = 'superadmin.html';
      } else if (datos.rol === 'admin') {
        window.location.href = 'admin.html';
      } else if (datos.rol === 'usuario') {
        window.location.href = 'usuario.html';
      } else {
        alert('Rol no reconocido.');
      }

    } else if (respuesta.status === 401) {
      mostrarError('Credenciales incorrectas');
    } else {
      mostrarError('Error en el servidor');
    }

  } catch (error) {
    console.error('Error de red:', error);
    mostrarError('Servidor no disponible');
  }
});

function mostrarError(mensaje) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = mensaje;
  errorDiv.style.display = 'block';
}
