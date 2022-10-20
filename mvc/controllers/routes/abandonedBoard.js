const express = require('express')
const app = express()
const router = express.Router()

const mysql = require('mysql');
const jjwDB = require('../../models/jjw.js');
// const conn = require("../models/jjw.js")
const db = mysql.createConnection(jjwDB)
// const con = mysql.createConnection({
//   host : 'localhost',
//   user : 'root',
//   password : 'kdt305',
//   database : 'project_c'
// })

const  abandonedHtml= require("./abandonedHtml")
app.use('/board', abandonedHtml)

router.get('/', (req, res) => {
  const sql = 'select * from missingboard'
  db.query(sql, req.body, (err, row) => {
    if(err) throw err;
    let a = row.map((element) => {
      return `<div id=list>
        <div id=text>[${element.location}] ${element.kind} ${element.gender}</div>
      </div>`
    }).join("")
    console.log(a)
    res.send(abandonedHtml(a))
  })
})

module.exports = router;