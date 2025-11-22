import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';
import mostrarLogin from './login.js';

export default function mostrarLogout() {

    // ⬇️ Estilos elegantes
    const style = document.createElement("style");
    style.textContent = `
      .logout-container {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        background: #f9f9ff;
      }

      .logout-box {
        background: white;
        padding: 30px 40px;
        border-radius: 16px;
        box-shadow: 0 5px 18px rgba(0,0,0,0.1);
        text-align: center;
      }

      .logout-box h2 {
        margin-bottom: 10px;
        color: #4f46e5;
      }

      .logout-box p {
        color: #555;
        font-size: 16px;
      }
    `;
    document.head.appendChild(style);
    // ⬆️ FIN estilos

    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="logout-container">
            <div class="logout-box">
                <h2>Cerrando sesión...</h2>
                <p>Por favor espera unos segundos</p>
            </div>
        </div>
    `;

    // Cerrar sesión y regresar al login
    signOut(auth)
        .then(() => {
            setTimeout(() => mostrarLogin(), 700); // 700ms para que se vea la animación
        })
        .catch((error) => {
            alert("Error al cerrar sesión: " + error.message);
            mostrarLogin();
        });
}
