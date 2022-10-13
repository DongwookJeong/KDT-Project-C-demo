const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8000;
const path = require('path')
const multer = require('multer')

const con = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'kdt305',
  database : 'project_c'
})
/**
 * * destination의 경우 저장된 file이 들어가는 폴더 지정
 * * filename의 경우 저장될 파일의 이름 지정
 * * 등록시 사진은 mvc/public 폴더안으로 들어간다
 */
const storage = multer.diskStorage({
  destination : function(req, res, callback){
    callback(null, './mvc/public')
  },
  filename : function (req, file, callback){
    const ex = path
    callback(null, file.originalname)
  }
})

const upload = multer({
  storage : storage
})

const boardRouter = require("../controllers/routes/board")
const abandonedRouter = require("../controllers/routes/abandonedBoard")

//? html에 css스타일 연결
app.use('/', express.static(__dirname + "../../views"))
app.use('/', express.static(__dirname + "../../public"))

//? 글쓰기 페이지
app.get('/createboard', (req, res) => {
  res.sendFile(path.join(__dirname + "../../views/createboard.html"))
})
//? 세부 내용
app.get('/detail', (req, res) => {
  res.sendFile(path.join(__dirname + "../../views/detail.html"))
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
/**
 * ? DB에 데이터 저장하는 코드
 * * animal은 반려동물의 이름 데이터
 * * kind는 견종 데이터
 * * gender은 성별 데이터
 * * age는 반려동물의 나이 데이터
 * * neutering는 반려동물의 중성화 데이터
 * * location은 반려동물을 잃어버린 장소 데이터
 * * matters는 특이사항 데이터(ex. 얼굴에 커다란 반점이 있고 귀엽다)
 * * image는 반려동물 사진 데이터
 */
app.post('/', upload.single("image"), (req, res) => {
  const sql = "INSERT INTO missingboard VALUES (null,?,?,?,?,?,?,?,?)"
  let animal = req.body.animal;
  let kind = req.body.kind;
  let gender = req.body.gender;
  let age = req.body.age;
  let neutering = req.body.neutering;
  let location = req.body.location;
  let matters = req.body.matters;
  let image = req.file.filename;
  let param = [animal, kind, gender, age, neutering, location, matters, image]
  con.query(sql, param, (err, row) => {
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