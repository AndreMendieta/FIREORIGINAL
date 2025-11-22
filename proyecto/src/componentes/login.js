import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';

export default function mostrarLogin() {

  // ⬇️ Estilos elegantes
  const style = document.createElement("style");
  style.textContent = `
    .login-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f9f9ff;
    }

    .login-box {
      background: white;
      padding: 40px 50px;
      border-radius: 16px;
      width: 330px;
      box-shadow: 0 5px 18px rgba(0,0,0,0.1);
      text-align: center;
      animation: fadeIn 0.4s ease-in-out;
    }

    .login-box h2 {
      margin-bottom: 20px;
      color: #4f46e5;
      font-size: 24px;
      font-weight: bold;
    }

    .login-box input {
      width: 100%;
      padding: 10px 14px;
      margin-bottom: 12px;
      border-radius: 10px;
      border: 1px solid #ccc;
      font-size: 14px;
      transition: 0.2s;
    }

    .login-box input:focus {
      border-color: #4f46e5;
      outline: none;
      box-shadow: 0 0 5px rgba(79,70,229,0.3);
    }

    .login-box button {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      border: none;
      background: #4f46e5;
      color: white;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
      transition: 0.2s;
    }

    .login-box button:hover {
      background: #4338ca;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
  // ⬆️ FIN estilos

  // ⬇️ Estructura HTML
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="login-container">
      <div class="login-box">
        <h2>Iniciar Sesión</h2>

        <input type="email" id="correo" placeholder="Correo electrónico" />
        <input type="password" id="contrasena" placeholder="Contraseña" />
        
        <button id="btnLogin">Ingresar</button>
      </div>
    </div>
  `;
  // ⬆️ FIN estructura

  // Evento del login
  document.getElementById("btnLogin").addEventListener("click", async () => {
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      window.location.reload(); 
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  });
}
