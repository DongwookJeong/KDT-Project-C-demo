const express = require("express");
// const { connect } = require("http2");
const imgRouter = require('../routes/img')
const app = express()
const mysql = require("mysql")
const path = require("path")
const router = express.Router()

const adddwSql = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'kdt305',
    database : 'adddw'
})


app.use('/add', imgRouter)

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,"add.html"))
})

router.post('/', (req, res)=>{
    let body = req.body
    let title = body.title
    let data = body.data
    let content = body.content
    // let sql = 
    adddwSql.query(`insert into addwt(title,content) values("${title}","${content}");`
    , function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/add')
    })
})
module.exports = router;
// ? 잠시 들어가 있어
// app.get('/feel', (req, res)=>{
    
//     adddwSql.query(`select * from addwt;`, function(err, result){
//         if(err){
//             console.log(err)
//         }else{
//             res.send(result)
//         }
//     })
    
// })

