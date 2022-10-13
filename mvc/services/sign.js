const express = require("express")
const crypto = require("crypto")
const app = express()
const mysql = require('mysql')
const path = require("path")
const bodyParser = require("body-parser")
const { copyFileSync } = require("fs")
const connection = require("../models/jw.js")
const db = mysql.createConnection(connection)
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
  db.query(`insert into user(id,name,address,phone,password) values(${id},"${name}","${address}","${phone}","${1}");`, (err)=>{
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


  db.query(sql,(err,result)=>{
  let islogin = false;
    
    if(err){
      console.log(err)
    }
    console.log(body)
    result.forEach((item) => {
      if(item.id == Number(body.id) && item.password == 1){
        islogin = true
      }
    });

    if(islogin){
      res.sendFile(path.join(__dirname, "..", "views" ,"login2.html"))
      // res.redirect("users")
    }else{
      console.log(err)
    }
  })
})
app.get("/idfind",function(req,res){
  res.sendFile(path.join(__dirname,"..","views","idfind.html"))
})

// app.post("/idfind",function(req,res){
//   let body = req.body;
//   connection.query("select * from user;",(err,results)=>{
//     if(err){
//       console.log(err)
//     }
//     console.log(body)
//     console.log(results)

//     for(let i = 0; i < results.length; i++){
//       if(results[i].name == body.name && results[i].phone == body.phone){
//         res.send(`"${results[i].id}"`)
//       }else{
//         res.redirect("/")
//       }
//     }  
  
    
//   })
// })

app.post("/idFind", (req,res)=>{
    
  let body = req.body
  db.query("select * from user" , (err, results)=>{
      if(err){
          console.error(err)
      }
      let result = results.map((items)=>{
          if(body.name == items.name && body.phone == items.phone){
              return items.id
          }   
      })
      let idResult = result.filter((data)=>{
          return data !== undefined
      })
      console.log(idResult)
      res.send(`아이디는 ${idResult[0]}입니다.`)
  })
})

app.listen(8000, ()=>{
  console.log("http://localhost:8000/")
});