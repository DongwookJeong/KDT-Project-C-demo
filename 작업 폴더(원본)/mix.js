//! npm install로 받은 사용할 패키지들
const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8000;

//! mysql에 연결
const conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'kdt305',
  database : 'test'
})

//! input을 통해 DB에 집어넣기위해 html의 위치를 잡아주는 역할
app.get('/create', (req, res) => {
  res.sendFile(__dirname + '/mix.html');
})

//! bodyParser관련
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//! DB에 데이터를 집어넣기 위한 코드
//? query문을 통해 input에 입력되었던 정보를 req.body에서 받아 DB에 저장하고 저장이 성공했으면 완료라는 문구를 띄어줌
app.post('/', (req, res) => {
  const sql = "INSERT INTO db_test SET ?"
  conn.query(sql, req.body, (err, row, field) => {
    if(err) throw err;
    console.log(row)
    res.send('완료')
  })
})

//! HTML내부에 form과 button을 구현하기위한 코드
//? classRoom의 [develop] node.js -8 | 누울자리 보고 앉기 참고
const createElement = {
  form: `
  <form action="http://localhost:${port}/create" method="get">
  <button type="submit" formaction="http://localhost:${port}/create">글쓰기</button>
  </form>
  `
}

//! HTML마크업 관련 sql에서 DB를 가져오고 foreach문을 사용해서 _id 1번에 위치한 name과 title의 정보를 가져옴
app.get('/', (req, res) => {
  const sql = "select * from db_test"
  conn.query(sql, (err, row) => {
      let a = row.map((element) => {
        return `<div style="width:30vw; height: 50px; font-size: 40px; color: skyblue;"><a href>${element.title}</a></div>
        <div style="width:50vw; height: 50px;">${element.name}</div>
        `
      }).join("")
      console.log(a)
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <header>
        ${createElement.form}
      </header>
      <main style="display: grid; grid-template-columns: 1fr 1fr;">
        ${a}
      </main>
    </body>
    </html>`)
  })
})



//app.get('/about', (req, res)=> {
//  const sql = "select * from db_test";
//  conn.query(sql, (err, row)=>{
//    res.send(row)
//  })
//})

app.listen(port, () => {
  console.log(`server is running on post... http://localhost:${port}`)
});