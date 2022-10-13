const express = require("express")
const crypto = require("crypto")
const app = express()
const crypto = require("crypto")
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

// function hashJuwan(pw){
// let salt = Math.random()
// let abc =  "" + pw * salt
// crypto.createHash("sha512").update(abc).digest('base64')
// console.log(password)
// }
// hashJuwan(1234)

app.post('/',(req,res)=>{
  
  let body = req.body;
  console.log(body)
  let id = body.id;
  let password = body.password;
  let name = body.name;
  let address = body.address;
  let phone = body.phone;
  
<<<<<<< HEAD
  let salt = Math.random()
  
  crypto.createHash("sha512").update(abc).digest('base64')
  
  connection.query(`insert into user(id,name,address,phone,password) values(${id},"${name}","${address}","${phone}","${password}");`, (err)=>{
=======
  // function hashJuwan(pw){
  
  // console.log(typeof(pww))
  // return pww
  // }


  let saltPw =  "" + password * salt
  let hashPassword = crypto.createHash("sha512").update(saltPw).digest('base64')

  console.log(hashPassword)
  connection.query(`insert into user(id,name,address,phone,password) values(${id},"${name}","${address}","${phone}","${hashPassword}");`, (err)=>{
>>>>>>> 531f800e1385164faeb73f81f71c7370d83ede67
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
<<<<<<< HEAD
  res.sendFile(path.join(__dirname,"..","views","login.html"))
=======
  res.sendFile(path.join(__dirname, "..", "views" ,"login.html"))
>>>>>>> 531f800e1385164faeb73f81f71c7370d83ede67
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
<<<<<<< HEAD
      res.sendFile(path.join(__dirname,"..","views","login2.html"))
=======
      res.sendFile(path.join(__dirname, "..", "views" ,"login2.html"))
      // res.send("hi")
>>>>>>> 531f800e1385164faeb73f81f71c7370d83ede67
    }else{
      console.log(err)
    }
  })
})

// app.get("/users", (req, res)=>{
//   connection.query("select * from user;", (err, results)=>{
//   res.send(results)
//   })
// })

app.listen(8000, ()=>{
  console.log("http://localhost:8000/")
});
