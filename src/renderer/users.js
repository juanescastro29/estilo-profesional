const viewUsersBtn = document.getElementById("viewUsersBtn");
const registUsersBtn = document.getElementById("registUsersBtn");

viewUsersBtn.addEventListener("click", () => {
  window.location.href = "viewUsers.html";
})

registUsersBtn.addEventListener("click", () => {
  window.location.href = "registUsers.html"
})