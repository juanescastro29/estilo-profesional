const mysql = require('promise-mysql')

const conection = mysql.createConnection({
  host: 'localhost',
  port: '3310',
  user: 'root',
  password: '',
  database: 'estiloprofesional'
})

function getConection() {
  return conection
}

module.exports = {
  getConection
}
