import { db } from '../firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

export default async function mostrarOriginal() {

  // ⬇️ Agregar estilos elegantes
  const style = document.createElement("style");
  style.textContent = `
    .editor-container {
      max-width: 650px;
      margin: auto;
      margin-top: 30px;
      padding: 25px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 5px 18px rgba(0,0,0,0.08);
    }

    .editor-container h2 {
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px;
      color: #3b3b3b;
    }

    .editor-container p {
      margin: 8px 0 4px;
      font-weight: 600;
      color: #494949;
    }

    .editor-container input {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      border: 2px solid #e0e0e0;
      margin-bottom: 12px;
      transition: 0.2s;
    }

    .editor-container input:focus {
      border-color: #4f46e5;
      background: #f9f9ff;
      outline: none;
    }

    .editor-json {
      margin-top: 20px;
      background: #f5f5f7;
      padding: 16px;
      border-radius: 12px;
      font-size: 14px;
      white-space: pre-wrap;
      overflow-x: auto;
      border: 1px solid #e3e3e3;
    }

    .load-btn, .save-btn {
      width: 100%;
      padding: 12px;
      margin-top: 15px;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: bold;
      transition: 0.2s;
    }

    .load-btn {
      background: #10a37f;
    }

    .load-btn:hover {
      background: #0e8b6d;
    }

    .save-btn {
      background: #4f46e5;
    }

    .save-btn:hover {
      background: #3c39d0;
    }
  `;
  document.head.appendChild(style);
  // ⬆️ FIN estilos

  // Contenedor principal
  const contenedor = document.getElementById("app");
  contenedor.innerHTML = "";

  // Wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "editor-container";

  // Título
  const titulo = document.createElement("h2");
  titulo.textContent = "Editor de Personaje (ThronesAPI)";
  wrapper.appendChild(titulo);

  // Selección de ID
  const pID = document.createElement("p");
  pID.textContent = "ID del personaje (0 - 52)";
  wrapper.appendChild(pID);

  const inputID = document.createElement("input");
  inputID.placeholder = "Ej: 1";
  inputID.value = "1";
  wrapper.appendChild(inputID);

  // Botón cargar personaje
  const btnCargar = document.createElement("button");
  btnCargar.className = "load-btn";
  btnCargar.textContent = "Cargar Personaje de la API";
  wrapper.appendChild(btnCargar);

  // Formulario dinámico
  const form = document.createElement("div");

  // Resultado JSON
  const resultado = document.createElement("pre");
  resultado.className = "editor-json";

  // Datos del personaje seleccionado
  let personaje = {};

  // Campos editables
  const campos = [
    { key: "fullName", label: "Nombre completo" },
    { key: "title", label: "Título" },
    { key: "family", label: "Familia" },
    { key: "imageUrl", label: "URL de Imagen" }
  ];

  // Función para dibujar inputs
  function actualizarFormulario() {
    form.innerHTML = "";

    campos.forEach(({ key, label }) => {
      const p = document.createElement("p");
      p.textContent = label;

      const input = document.createElement("input");
      input.value = personaje[key] || "";

      input.oninput = () => {
        personaje[key] = input.value;
        resultado.textContent = JSON.stringify(personaje, null, 2);
      };

      form.appendChild(p);
      form.appendChild(input);
    });

    resultado.textContent = JSON.stringify(personaje, null, 2);
  }

  // Cargar personaje desde API
  btnCargar.onclick = async () => {
    const id = inputID.value.trim();

    if (!id) return alert("Debes ingresar un ID");

    try {
      const res = await fetch(`https://thronesapi.com/api/v2/Characters/${id}`);
      personaje = await res.json();

      actualizarFormulario();
    } catch (e) {
      console.error(e);
      alert("❌ Error cargando personaje");
    }
  };

  // ⬇️ Botón para guardar en Firebase
  const btnGuardar = document.createElement("button");
  btnGuardar.className = "save-btn";
  btnGuardar.textContent = "Guardar en Firebase";

  btnGuardar.onclick = async () => {
    try {
      await addDoc(collection(db, "personajes"), personaje);
      alert("✅ Personaje guardado correctamente en Firebase");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("❌ Hubo un problema guardando el personaje");
    }
  };

  // Agregar a wrapper
  wrapper.appendChild(form);
  wrapper.appendChild(resultado);
  wrapper.appendChild(btnGuardar);

  // Mostrar en pantalla
  contenedor.appendChild(wrapper);
}
