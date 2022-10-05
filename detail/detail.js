const express = require("express");
// const { connect } = require("http2");
// const imgRouter = require('./routes/img')
const app = express()
const mysql = require("mysql")
const path = require("path")
const cart = require('../routes/cart')
const port = 5000;

const detailSql = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'kdt305',
    database : 'detail'
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use('/detail', imgRouter)
app.use('/cart',cart)

app.get('/detail', (req, res)=>{
    res.sendFile(path.join(__dirname,"detail.html"))
})

app.post('/detail', (req, res)=>{
    let body = req.body
    let id = body.id
    let title = body.title
    let content = body.content
    // let sql = 
    detailSql.query(`insert into detail(id,title,content) values(${id},"${title}","${content}");`
    , function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/feel')
    })
})

app.get('/feel', (req, res)=>{
    
    detailSql.query(`select * from detail;`, function(err, result){
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
    
})

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/detail`)
})