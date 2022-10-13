const express = require("express")
const crypto = require("crypto")
const app = express()
const mysql = require('mysql')
const path = require("path")
const bodyParser = require("body-parser")
const { copyFileSync } = require("fs")
const connection = mysql.createConnection({
  host :'localhost',
  port : "3306",
  user: 'root',
  password:'rzo01042218221@',
  database:'node.js'
})

let salt = 3.14102938
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static(__dirname + "../../public"))


app.get('/',function(req , res){
  res.sendFile(path.join(__dirname , "..", "views" ,"sign.html"))
})

app.post('/',(req,res)=>{
  
  let body = req.body;
  console.log(body)
  let id = body.id;
  let password = body.password;
  let name = body.name;
  let address = body.address;
  let phone = body.phone;
  
  // function hashJuwan(pw){
  
  // console.log(typeof(pww))
  // return pww
  // }


  let saltPw =  "" + password * salt
  let hashPassword = crypto.createHash("sha512").update(saltPw).digest('base64')

  console.log(hashPassword)
  connection.query(`insert into user(id,name,address,phone,password) values(${id},"${name}","${address}","${phone}","${hashPassword}");`, (err)=>{
    if(err){
      console.error(err);
    }
  })
  res.redirect("/login")
})

// app.get('/users', (req, res)=>{
//     let sql = "select * from user;"
//     connection.query(sql, (err, result)=>{
//         if(err){
//             console.log(err)
//           }
//           res.send(result);
//         })
//       })
      
app.get("/login",function(req,res){
  res.sendFile(path.join(__dirname, "..", "views" ,"login.html"))
})

app.post("/login",function(req,res){
  let sql ="select * from user;"
  let body = req.body;
  let password = body.password

  let saltPw =  "" + password * salt
  let hashPassword = crypto.createHash("sha512").update(saltPw).digest('base64')


  connection.query(sql,(err,result)=>{
  let islogin = false;
    
    if(err){
      console.log(err)
    }
    console.log(body)
    result.forEach((item) => {
      if(item.id == Number(body.id) && item.password == hashPassword){
        islogin = true
      }
    });

    if(islogin){
      // res.sendFile(path.join(__dirname, "..", "views" ,"login2.html"))
      res.redirect("users")
    }else{
      console.log(err)
    }
  })
})
app.get("/idfind",function(req,res){
  res.sendFile(path.join(__dirname,"..","views","idfind.html"))
})

app.post("/idfind",function(req,res){
  let body = req.body;
  connection.query("select * from user;",(err,results)=>{
    let idfinds = false
    if(err){
      console.log(err)
    }
    console.log(body)
    results.forEach((items)=>{
      if(items.name == body.name && items.phone == body.phone){
        idfinds = true
      }
    })
    if(idfinds){
      res.redirect("users")
    }else{
      console.log(err)
    }
  })
})

  
app.get("/users", (req, res)=>{
  let body = req.body
  connection.query("select id from user;", (err, results)=>{
    results.forEach((items)=>{
      if(items.name == body.name && items.phone == body.phone){
      res.send(results)
      }
  })
})

app.listen(8000, ()=>{
  console.log("http://localhost:8000/")
});