const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8000;

const conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'kdt305',
  database : 'test'
})

app.get('/create', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//app.get('/', (req, res) => {
//  res.sendFile(path.join(__dirname + '/index.html'))
//})

app.post('/', (req, res) => {
  const sql = "INSERT INTO db_test SET ?"

  conn.query(sql, req.body, (err, row, field) => {
    if(err) throw err;
    console.log(row)
    res.send('완료')
  })
})

app.get('/', (req, res) => {
  const sql = "select * from db_test"
  conn.query(sql, (err, row) => {
    let a = ""
    let b = ""
    row.forEach(element => {
      if(element._id === 1){
        a = element.name;
        b = element.title;
      }
    })
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div>${a}</div>
      ${b}
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