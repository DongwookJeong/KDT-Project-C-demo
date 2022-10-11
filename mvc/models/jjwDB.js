const con =  mysql.createConnection({
  host : 'localhost',
  port : '3306',
  user : 'root',
  password : 'kdt305',
  database : 'project_c'
})

const db = {...con}

module.exports = db;