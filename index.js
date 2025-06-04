// index.js
const express = require('express');
const path    = require('path');
const Session = require('./Session');
const DataBase = require('./DataBase');

const app = express();

// 1) Middleware para parsear JSON en el body
app.use(express.json());

// 2) Inicializar la base de datos y exponerla como global.database
const db = new DataBase(() => {
  console.log('⚙️  Base de datos inicializada.');
});
global.database = db;

// 3) Instanciar el manejador de sesión (Session.js) y pasarle la app
const sessionManager = new Session(app);

// 4) Servir la carpeta "public" como estática para archivos .html, .css, etc.
app.use(express.static(path.join(__dirname, 'public')));

// 5) Ruta raíz “/”: envío directo del LoginForm.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'LoginForm.html'));
});

// 6) Ruta POST /login: procesa { userName, password } y crea la sesión
app.post('/login', async (req, res) => {
  try {
    // 6.1) Intentar autenticar usuario
    await sessionManager.authenticateUser(req);

    if (sessionManager.sessionObject.status) {
      // 6.2) Si status=true, creamos la sesión con createSession()
      const perfil = sessionManager.sessionObject.profile;
      const ok = sessionManager.createSession(req, perfil);

      if (ok) {
        return res.send('✔️ Login exitoso');
      } else {
        return res.status(500).send('⚠️ No se pudo crear la sesión');
      }
    } else {
      // 6.3) Credenciales inválidas
      return res.status(401).send('❌ Credenciales inválidas');
    }
  } catch (err) {
    console.error('Error en /login:', err);
    return res.status(500).send('❌ Error interno en el servidor');
  }
});

// 7) Ruta POST /logout: destruye la sesión
app.post('/logout', async (req, res) => {
  try {
    await sessionManager.closeSession(req);
    return res.send('↩️ Logout exitoso');
  } catch (err) {
    console.error('Error en /logout:', err);
    return res.status(500).send('⚠️ Error cerrando sesión');
  }
});

// 8) Ejemplo de ruta protegida: sólo accesible si existe sesión activa
app.get('/protected', (req, res) => {
  if (sessionManager.sessionExist(req)) {
    return res.send(`🛡️ Bienvenido, ${req.session.userName}`);
  } else {
    return res.status(401).send('❌ No autorizado');
  }
});

// 9) Arrancar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
