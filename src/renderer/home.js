const bntViewCites = document.getElementById('viewCitesBtn');
const btnCreateCites = document.getElementById('createCitesBtn');
const btnRegistUser = document.getElementById('registUserBtn');

bntViewCites.addEventListener('click', () => {
  window.location.href="viewCites.html"
  console.log("click view cites");
})

btnCreateCites.addEventListener('click', () => {
  console.log("click create cites");
})

btnRegistUser.addEventListener('click', () => {
  console.log("click regist user");
})

