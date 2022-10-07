const express = require('express')
const router = express.Router()
const mysql = require('mysql');

const con = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'kdt305',
  database : 'project_c'
})

router.get('/', (req, res) => {
  const sql = 'select * from missingboard'
  con.query(sql, req.body, (err, row) => {
    if(err) throw err;
    let a = row.map((element) => {
      return `<div id=list>
        <div id=text>[${element.location}] ${element.kind} ${element.gender}</div>
      </div>`
    }).join("")
    console.log(a)
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link rel="stylesheet" href="http://localhost:8000/board.css">
    </head>
    <body>
      <div id="root">
        <header>
          <div class="logo">
            <a href="">
              <img src="http://localhost:8000/로고.png" alt="" class="img">
            </a>
          </div>
          <div class="name">
            <div>유기 동물 개시판</div>
          </div>
          <div class="login">
            <a href="">
              <button class="signUp">회원가입</button>
            </a>
            <a href="">
              <button class="signIn">로그인</button>
            </a>
          </div>
        </header>
        <sidebar id="sidebar">
          <div>
            <input type="text" class="search">
          </div>
        </sidebar>
        <main>
          <div id="menu">
            <a href="http://localhost:8000/board">
              <button class="leftbt" formaction="http://localhost:8000/board">실종 동물 페이지</button>
            </a>
          </div>
          <div id="section">
            ${a}
          </div>
          <div class="pagenation">
            <p><</p>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>></p>
          </div>
        </main>
      </div>
    </body>
    </html>`)
  })
})

module.exports = router;