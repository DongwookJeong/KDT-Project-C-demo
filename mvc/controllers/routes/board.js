const express = require('express')
const app = express('express')
const router = express.Router()
const mysql = require('mysql');
const jjwDB = require('../../models/jjw');

// const connection = require("../models/jjw.js")
const db = mysql.createConnection(jjwDB)
// const con = mysql.createConnection({
//   host : 'localhost',
//   user : 'root',
//   password : 'kdt305',
//   database : 'project_c'
// })

const boardHtml = require("./boardHtml")
app.use('/board', boardHtml)

router.get('/', (req, res) => {
  const sql = 'select * from missingboard'
  db.query(sql, req.body, (err, row) => {
    if(err) throw err;
    let a = row.map((element) => {
      return `<div id=list>
        <img src="${element.image}" style="width:250px; height:350px;position:relative;">
        <div id=text>[${element.location}] ${element.kind} ${element.gender}</div>
      </div>`
    }).join("")
    res.send(boardHtml(a))
  })
})

module.exports = router;