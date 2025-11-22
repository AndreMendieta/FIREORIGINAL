// Firebase
import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';

// Importar vistas
import mostrarHome from "./componentes/home.js";
import mostrarOriginal from "./componentes/original.js";
import mostrarLogout from "./componentes/logout.js";
import mostrarLogin from "./componentes/login.js";
import mostrarRegistro from "./componentes/registro.js";


// ⬇️ ESTILOS ELEGANTES AGREGADOS DIRECTAMENTE DESDE JS
const style = document.createElement("style");
style.textContent = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

body {
    background: #f5f7fb;
    padding: 20px;
}

#menu nav {
    display: flex;
    gap: 12px;
    padding: 10px 0;
}

nav button {
    padding: 10px 18px;
    background: white;
    border: 2px solid #d6d6d6;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.25s ease;
    font-weight: 600;
}

nav button:hover {
    background: #4f46e5;
    color: white;
    border-color: #4f46e5;
}

#app {
    margin-top: 20px;
    background: white;
    padding: 25px;
    border-radius: 16px;
    box-shadow: 0px 5px 18px rgba(0, 0, 0, 0.08);
}

input {
    width: 100%;
    padding: 12px;
    margin-top: 8px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    transition: 0.2s;
}

input:focus {
    border-color: #4f46e5;
    outline: none;
    background: #f7f7ff;
}

button {
    margin-top: 15px;
    width: 100%;
    padding: 12px;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    cursor: pointer;
    font-weight: bold;
}

button:hover {
    background: #3b36c7;
}

.app-card {
    display: flex;
    gap: 15px;
    padding: 14px;
    background: white;
    border-radius: 12px;
    border: 1px solid #e6e6e6;
    margin-bottom: 15px;
    transition: 0.2s;
}

.app-card:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.08);
}

.app-card img {
    width: 64px;
    height: 64px;
}

.app-info h2 {
    margin-bottom: 6px;
    color: #333;
}

a {
    color: #4f46e5;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
`;
document.head.appendChild(style);


// 🔥 Detectar cambios en la autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {

        document.getElementById("menu").innerHTML = `
            <nav>
                <button id="menuHome">Home</button>
                <button id="menuOriginal">Original</button>
                <button id="menuLogout">Logout</button>
            </nav>
        `;

        document.getElementById("menuHome").addEventListener("click", mostrarHome);
        document.getElementById("menuOriginal").addEventListener("click", mostrarOriginal);
        document.getElementById("menuLogout").addEventListener("click", mostrarLogout);

        mostrarHome();

    } else {

        document.getElementById("menu").innerHTML = `
            <nav>
                <button id="menuLogin">Login</button>
                <button id="menuRegistro">Registro</button>
            </nav>
        `;

        document.getElementById("menuLogin").addEventListener("click", mostrarLogin);
        document.getElementById("menuRegistro").addEventListener("click", mostrarRegistro);

        mostrarLogin();
    }
});
