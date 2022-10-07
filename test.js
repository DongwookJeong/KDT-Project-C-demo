//! 변경점
function static(set, midle){
  app.use(set, express.static(midle))
}
static('/', './css')
static('/', './image')

//! 변경점
function getting(port, file){
  app.get(port, (req, res) => {
    res.sendfile(__dirname + file)
  })
}
getting('/createboard', '/createboard.html')
getting('/detail', '/detail.html')

//! 변경점
function database(port){
  const sql = port
  con.query(sql, req.body, (err, row) => {
    if(err) throw err;
  })
}

app.post('/', (req, res) => {
  const sql = "INSERT INTO missingboard SET ?"
  con.query(sql, req.body, (err, row) => {
    if(err) throw err;
    console.log(row)
    res.send("완료")
  })
})

app.get('/board', (req, res) => {
  const sql = 'select * from missingboard'
  con.query(sql, req.body, (err, row) => {
    if(err) throw err;
    let a = row.map((element) => {
      return
    })
  })
})