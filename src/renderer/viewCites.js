const { ipcRenderer } = require("electron");
const citesList = document.getElementById("citesList");
const noData = document.getElementById("noData");
const nextPage = document.getElementById("nextPage");
const pastPage = document.getElementById("pastPage");
const searchCite = document.getElementById("searchCite");

let citesRender = [];
let page = 0;

searchCite.addEventListener("input", (e) => {
  const elementsData = {
    page: page,
    search: e.target.value,
  };
  console.log(elementsData);
  ipcRenderer.send("search-cites", elementsData);
});

searchCite.addEventListener("keyup", (e) => {
  if (e.key == "Escape") {
    searchCite.value = "";
  }
})

pastPage.addEventListener("click", () => {
  console.log("click");
  console.log(page);
  if (page >= 1) {
    page = page - 1;
    noData.innerHTML = "";
    ipcRenderer.send("get-cities", page);
  }
});

nextPage.addEventListener("click", () => {
  if (page >= 0 && citesRender.length > 0) {
    page = page + 1;
    ipcRenderer.send("get-cities", page);
    console.log(page);
    console.log(citesRender);
  }
});

function renderCites(cites) {
  citesList.innerHTML = "";
  noData.innerHTML = "";
  cites.length !== 0
    ? cites.forEach((cite) => {
        citesList.innerHTML += `
    <tr>
      <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
      >
        ${cite.fechaCita}
      </td>
      <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
      >
        ${cite.hora}
      </td>

      <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
      >
        ${cite.idUsuario}
      </td>

      <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
      >
        ${cite.nombreUsuario}
      </td>
      <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
      >
        ${cite.idProcedimiento}
      </td>
      <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
      >
        ${cite.nombreEmpleado}
      </td>
      <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
      >
        ${
          cite.estado === "ACTIVA"
            ? `<div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h2 class="text-sm font-normal">Activa</h2>
            </div>`
            : `<div class="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3L3 9M3 3L9 9"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <h2 class="text-sm font-normal">Cancelada</h2>
            </div>`
        }
      </td>
      <td class="px-4 py-4 text-sm whitespace-nowrap">
        <div class="flex items-center gap-x-6">
          <button
            class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
            id="deleteCite"
          >
            Borrar
          </button>
          <button
            class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
            id="editCite"
          >
            Editar
          </button>
        </div>
      </td>
    </tr>`;
      })
    : (noData.innerHTML += `
          <div class="flex items-center mt-6 text-center h-96 dark:border-gray-700">
          <div class="flex flex-col w-full max-w-sm px-4 mx-auto">
              <div class="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
              </div>
              <h1 class="mt-3 text-lg text-gray-600 dark:text-gray-500">Sin citas</h1>
              <p class="mt-2 text-gray-400 dark:text-gray-400">No hay citas actualmente agentadas.</p>
              <div class="flex items-center mt-4 sm:mx-auto gap-x-3">
                  <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>

                      <span>Agendar cita</span>
                  </button>
              </div>
          </div>
      </div>
  `);
}

function renderSearch(cites) {
  citesList.innerHTML = "";
  noData.innerHTML = "";
  cites.length !== 0
    ? renderCites(cites)
    : (noData.innerHTML += `
          <div class="flex items-center mt-6 text-center h-96 dark:border-gray-700">
          <div class="flex flex-col w-full max-w-sm px-4 mx-auto">
              <div class="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
              </div>
              <h1 class="mt-3 text-lg text-gray-600 dark:text-gray-500">No se encuentran citas</h1>
              <p class="mt-2 text-gray-400 dark:text-gray-400">La busqueda "${searchCite.value}" no encuentra ninguna cita.</p>
              <div class="flex items-center mt-4 sm:mx-auto gap-x-3">
                  <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>

                      <span>Agendar cita</span>
                  </button>
              </div>
          </div>
      </div>
  `);
}

ipcRenderer.on("cites", (event, args) => {
  citesRender = JSON.parse(args);
  renderCites(citesRender);
  console.log(citesRender);
});

ipcRenderer.on("search", (event, args) => {
  citesRender = JSON.parse(args);
  renderSearch(citesRender)
});

ipcRenderer.send("get-cites", page);
