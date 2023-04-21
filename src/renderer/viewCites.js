const { ipcRenderer } = require("electron");
const citesList = document.getElementById("citesList");
const noData = document.getElementById("noData");
const nextPage = document.getElementById("nextPage");
const pastPage = document.getElementById("pastPage");
const searchCite = document.getElementById("searchCite");

let citesRender = [];
let citesSearch = [];
let page = 0;

searchCite.addEventListener("input", (e) => {
  const elementsData = {
    page: page,
    search: e.target.value,
  };
  if (elementsData.search == "") {
    ipcRenderer.send("get-cites", page);
  } else {
    ipcRenderer.send("search-cites", elementsData);
  }
});

searchCite.addEventListener("keyup", (e) => {
  if (e.key == "Escape") {
    searchCite.value = "";
    ipcRenderer.send("get-cites", page);
  }
});

pastPage.addEventListener("click", () => {
  if (page >= 1) {
    page = page - 1;
    noData.innerHTML = "";
    ipcRenderer.send("get-cites", page);
  }
});

nextPage.addEventListener("click", () => {
  if (page >= 0 && citesRender.length > 0) {
    page = page + 1;
    ipcRenderer.send("get-cites", page);
  }
});

function changestatus(statusID) {
  ipcRenderer.send("change-status", statusID);
  window.location.reload();
}

function deleteCite(citeId) {
  ipcRenderer.send("delete-cites", citeId);
  window.location.reload();
}

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
        ${cite.nombreProcedimiento}
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
        <div x-data="{ isOpen: false }" class="relative flex justify-center">
          <button
            @click="isOpen = true"
            class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
            id="deleteCite"
            >
            Cancelar
          </button>
          <div x-show="isOpen" 
          x-transition:enter="transition duration-300 ease-out"
          x-transition:enter-start="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          x-transition:enter-end="translate-y-0 opacity-100 sm:scale-100"
          x-transition:leave="transition duration-150 ease-in"
          x-transition:leave-start="translate-y-0 opacity-100 sm:scale-100"
          x-transition:leave-end="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          class="fixed inset-0 z-10 overflow-y-auto" 
          aria-labelledby="modal-title" role="dialog" aria-modal="true"
      >
          <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
              <div class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                  <div>
                      <div class="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                    
                      </div>
                      <div class="mt-2 text-center">
                          <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Cancelar cita</h3>
                          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                              ¿Esta segura que desea cancelar esta cita?
                          </p>
                      </div>
                  </div>
  
                  <div class="mt-5 sm:flex sm:items-center sm:justify-center">
                      <div class="sm:flex sm:items-center ">
                          <button @click="isOpen = false" class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                              Cancelar
                          </button>
  
                          <button class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                          onclick="changestatus(${cite.idCita})"
                          >
                              Actualizar
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
        <div x-data="{ isOpen: false }" class="relative flex justify-center">
          <button
            @click="isOpen = true"
            class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
            id="editCite"
          >
            Eliminar
          </button>
        <div x-show="isOpen" 
        x-transition:enter="transition duration-300 ease-out"
        x-transition:enter-start="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        x-transition:enter-end="translate-y-0 opacity-100 sm:scale-100"
        x-transition:leave="transition duration-150 ease-in"
        x-transition:leave-start="translate-y-0 opacity-100 sm:scale-100"
        x-transition:leave-end="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        class="fixed inset-0 z-10 overflow-y-auto" 
        aria-labelledby="modal-title" role="dialog" aria-modal="true"
    >
     cancelar   <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                    <div class="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </div>
                    <div class="mt-2 text-center">
                        <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Eliminar cita</h3>
                        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            ¿Esta segura que desea eliminar esta cita?
                        </p>
                    </div>
                </div>

                <div class="mt-5 sm:flex sm:items-center sm:justify-center">
                    <div class="sm:flex sm:items-center ">
                        <button @click="isOpen = false" class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                            Cancelar
                        </button>

                        <button class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        onclick="deleteCite(${cite.idCita})"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
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
                  <a href="createCites.html" class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600" id="createCite">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>

                      <span>Agendar cita</span>
                  </a>
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
                  <a href="createCites.html" class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600" id="createCite">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>

                      <span>Agendar cita</span>
                  </a>
              </div>
          </div>
      </div>
  `);
}

ipcRenderer.on("cites", (event, args) => {
  citesRender = JSON.parse(args);
  renderCites(citesRender);
});

ipcRenderer.on("search-cites", (event, args) => {
  citesSearch = JSON.parse(args);
  renderSearch(citesSearch);
});

ipcRenderer.send("get-cites", page);
