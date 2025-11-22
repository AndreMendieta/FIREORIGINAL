import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig.js'; // Ajusta el path si es diferente

export default function mostrarRegistro() {

  // ⬇️ Agregar estilos directamente en este JS
  const style = document.createElement("style");
  style.textContent = `
  .registro-container {
    max-width: 400px;
    margin: auto;
    background: white;
    margin-top: 25px;
    padding: 25px;
    border-radius: 16px;
    box-shadow: 0 5px 18px rgba(0,0,0,0.08);
  }

  .registro-container h2 {
    text-align: center;
    margin-bottom: 18px;
    font-weight: 600;
    color: #3b3b3b;
  }

  .registro-container input {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    transition: 0.2s;
  }

  .registro-container input:focus {
    border-color: #4f46e5;
    outline: none;
    background: #f7f7ff;
  }

  .registro-container button {
    width: 100%;
    padding: 12px;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 10px;
    margin-top: 18px;
    font-size: 15px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s;
  }

  .registro-container button:hover {
    background: #3a37cf;
  }
  `;
  document.head.appendChild(style);
  // ⬆️ FIN estilos elegantes


  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="registro-container">
      <h2>Registro</h2>

      <input type="text" id="nombre" placeholder="Nombre"><br>
      <input type="email" id="correo" placeholder="Correo electrónico"><br>
      <input type="password" id="contrasena" placeholder="Contraseña"><br>
      <input type="text" id="fecha" placeholder="Fecha de nacimiento"><br>
      <input type="tel" id="telefono" placeholder="Teléfono"><br>

      <button id="btnRegistro">Registrarse</button>
    </div>
  `;

  document.getElementById("btnRegistro").addEventListener("click", async () => {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const fecha = document.getElementById("fecha").value;
    const telefono = document.getElementById("telefono").value;

    let ganados = 0;
    let perdidos = 0;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        nombre,
        correo,
        fecha,
        telefono,
        ganados,
        perdidos
      });

      alert('Usuario registrado correctamente');
      mostrarLogin();

    } catch (error) {
      alert('Error al registrarse: ' + error.message);
    }
  });
}
