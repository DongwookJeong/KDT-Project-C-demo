const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8000;

const con = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'kdt305',
  database : 'project_c'
})

const boardRouter = require("./router/board")
const abandonedRouter = require("./router/abandonedBoard")

//? html에 css스타일 연결
function static(set, midle){
  app.use(set, express.static(midle))
}
static('/', './css')
static('/', './image')

//! 함수생성
function getting(port, file){
  app.get(port, (req, res) => {
    res.sendfile(__dirname + file)
  })
}
//? 글쓰기 페이지
getting('/createboard', '/createboard.html')
//? 세부 내용
getting('/detail', '/detail.html')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
//? DB에 데이터 저장
app.post('/', (req, res) => {
  const sql = "INSERT INTO missingboard SET ?"
  con.query(sql, req.body, (err, row) => {
    if(err) throw err;
    console.log(row)
    res.send("완료")
  })
})

app.use('/board', boardRouter);
app.use('/abendoned', abandonedRouter);

app.listen(port, () =>{
  console.log(`http://localhost:${port}/board`)
})