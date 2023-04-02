const { ipcRenderer } = require("electron");
const userList = document.getElementById("userList");
const noData = document.getElementById("noData");
const nextPage = document.getElementById("nextPage");
const pastPage = document.getElementById("pastPage");
const searchUser = document.getElementById("searchUser");

let usersRender = [];
let usersSearch = [];
let page = 0;

searchUser.addEventListener("input", (e) => {
  const elementsData = {
    page: page,
    search: e.target.value,
  };
  console.log(elementsData);
  ipcRenderer.send("search-users", elementsData);
});

searchUser.addEventListener("keyup", (e) => {
  if (e.key == "Escape") {
    searchCite.value = "";
  }
  const elementsData = {
    page: page,
    search: searchUser.value,
  };
  ipcRenderer.send("search-users", elementsData);
});

pastPage.addEventListener("click", () => {
  if (page >= 1) {
    page = page - 1;
    noData.innerHTML = "";
    ipcRenderer.send("get-users", page);
  }
});

nextPage.addEventListener("click", () => {
  if (page >= 0 && usersRender.length > 0) {
    page = page + 1;
    ipcRenderer.send("get-users", page);
  }
});

function renderUsers(users) {
  userList.innerHTML = "";
  noData.innerHTML = "";
  users.length !== 0
    ? users.forEach((user) => {
        userList.innerHTML += `
    <tr>
      <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
      >
        ${user.idUsuario}
      </td>
      <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
      >
        ${user.nombreUsuario}
      </td>

      <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
      >
        ${user.apellidoUsuario}
      </td>

      <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
      >
        ${user.telefonoUsuario}
      </td>
      <td class="px-4 py-4 text-sm whitespace-nowrap">
        <div class="flex items-center gap-x-6">
          <button
            class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
            id="deleteCite"
          >
            Eliminar
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
              <h1 class="mt-3 text-lg text-gray-600 dark:text-gray-500">Sin usuarios</h1>
              <p class="mt-2 text-gray-400 dark:text-gray-400">No hay usuarios actualmente registrados.</p>
              <div class="flex items-center mt-4 sm:mx-auto gap-x-3">
                  <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600" id="registUserBtn">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Agregar Usuario</span>
                  </button>
              </div>
          </div>
      </div>
  `);
}

function renderSearch(users) {
  userList.innerHTML = "";
  noData.innerHTML = "";
  users.length !== 0
    ? renderUsers(users)
    : (noData.innerHTML += `
          <div class="flex items-center mt-6 text-center h-96 dark:border-gray-700">
          <div class="flex flex-col w-full max-w-sm px-4 mx-auto">
              <div class="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
              </div>
              <h1 class="mt-3 text-lg text-gray-600 dark:text-gray-500">No se encuentran citas</h1>
              <p class="mt-2 text-gray-400 dark:text-gray-400">La busqueda "${searchUser.value}" no encuentra ningun usuario.</p>
              <div class="flex items-center mt-4 sm:mx-auto gap-x-3">
                  <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600" id="registUserBtn">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Agregar usuario</span>
                  </button>
              </div>
          </div>
      </div>
  `);
}

ipcRenderer.on("users", (event, args) => {
  usersRender = JSON.parse(args);
  renderUsers(usersRender);
});

ipcRenderer.on("search-users", (event, args) => {
  usersSearch = JSON.parse(args);
  renderSearch(usersSearch);
});

ipcRenderer.send("get-users", page);
