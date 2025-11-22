export default async function mostrarHome() {
  // Estilos
  const style = document.createElement("style");
  style.textContent = `
    .home-container {
      padding: 40px;
      min-height: 100vh;
      background: linear-gradient(135deg, #f9fbff, #e6e9ff);
      animation: fadeIn 0.6s ease-in-out;
    }

    .titulo-home {
      text-align: center;
      color: #2a2a72;
      font-size: 38px;
      font-weight: 900;
      margin-bottom: 10px;
      letter-spacing: 1px;
    }

    .subtitulo {
      text-align: center;
      color: #5a5a5a;
      margin-bottom: 35px;
      font-size: 17px;
    }

    .personajes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 25px;
    }

    .personaje-card {
      background: white;
      padding: 25px;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      transition: .3s ease;
      cursor: pointer;
      animation: pop 0.3s ease-out;
    }

    .personaje-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }

    .personaje-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;
    }

    .personaje-img {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #2a2a72;
    }

    .personaje-card h2 {
      color: #1a1a50;
      margin: 0;
      font-size: 20px;
    }

    .personaje-card p {
      margin: 6px 0;
      color: #444;
      font-size: 15px;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    @keyframes pop {
      from { transform: scale(.95); opacity: 0; }
      to   { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Contenedor principal
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
    <div class="home-container">
        <h1 class="titulo-home">🏰 Game of Thrones Characters</h1>
        <p class="subtitulo">Información obtenida desde ThronesAPI</p>
        <p>Cargando personajes...</p>
    </div>
  `;

  const homeContainer = document.querySelector(".home-container");

  try {
    // ✔ Consumir API
    const response = await fetch("https://thronesapi.com/api/v2/Characters");
    const personajes = await response.json();

    if (personajes.length === 0) {
      homeContainer.innerHTML += "<p>No se encontraron personajes.</p>";
      return;
    }

    // Crear grid
    const grid = document.createElement("div");
    grid.classList.add("personajes-grid");

    personajes.forEach((p) => {
      const card = document.createElement("div");
      card.classList.add("personaje-card");

      card.innerHTML = `
        <div class="personaje-header">
          <img class="personaje-img" src="${p.imageUrl}">
          <h2>${p.fullName}</h2>
        </div>

        <p><strong>Título:</strong> ${p.title || "Sin título"}</p>
        <p><strong>Familia:</strong> ${p.family || "Desconocida"}</p>
      `;

      grid.appendChild(card);
    });

    homeContainer.appendChild(grid);

  } catch (error) {
    console.error("Error al cargar:", error);
    homeContainer.innerHTML += "<p>Error al cargar los personajes 😢</p>";
  }
}
