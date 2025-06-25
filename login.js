const API_URL = 'http://18.221.167.106:3000/api/auth/login'; // Cambia esto

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const mensaje = document.getElementById('mensaje');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('session', data.session);
      localStorage.setItem('role', data.usuario.role);
      localStorage.setItem('username', data.usuario.username);
      mensaje.textContent = 'Login exitoso';
      location.href = data.usuario.role + '.html';
    } else {
      mensaje.textContent = data.msg || 'Error al iniciar sesión';
    }
  } catch (err) {
    mensaje.textContent = 'Servidor no disponible';
  }
});
