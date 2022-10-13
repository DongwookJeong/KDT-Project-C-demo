const express = require('express')
const app = express('express')
const router = express.Router()
const mysql = require('mysql');

const con = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'kdt305',
  database : 'project_c'
})

const boardHtml = require("./boardHtml")
app.use('/board', boardHtml)

router.get('/', (req, res) => {
  const sql = 'select * from missingboard'
  con.query(sql, req.body, (err, row) => {
    if(err) throw err;
    let a = row.map((element) => {
      return `<div id=list>
        <div id=text>[${element.location}] ${element.kind} ${element.gender}</div>
      </div>`
    }).join("")
    res.send(boardHtml(a))
  })
})

module.exports = router;