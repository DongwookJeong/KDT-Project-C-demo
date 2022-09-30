// const express = require("express")
// const app = express()

// const mysql = require("mysql")
// const path = require("path")
// const port = 5566;
// const mysqlConnect = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'kdt305',
//     database : 'login'
// })

// const key = keyPoket;
// const url = `http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList`;
// const keyUrl = url + `?serviceKey=${key}`

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
// app.use(express.response.send(){
//     async function wait(){
//             const res = await fetch(keyUrl)
//             const dataXml = await res.text()
        
//             let domparser = new DOMParser()
//             let value = domparser.parseFromString(dataXml, "application/xml")
//             const dataItems = value.querySelectorAll("items")
//             const dataArray = Array.from(dataItems)
//             const dataValue = dataArray.querySelector("filePath").innerHTML
        
//             root.innerHTML = `<"src="http://www.daejeon.go.kr/${dataValue}/>`
//         }
// })

// import keyPoket from "./key.js"
// const root = document.getElementById("root");
// const key = keyPoket;
// const url = `http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList`;
// const keyUrl = url + `?serviceKey=${key}`

// async function wait(){
//     const res = await fetch(keyUrl)
//     const dataXml = await res.text()

//     let domparser = new DOMParser()
//     let value = domparser.parseFromString(dataXml, "application/xml")
//     const dataItems = value.querySelectorAll("items")
//     const dataArray = Array.from(dataItems)
//     const dataValue = dataArray.querySelector("filePath").innerHTML

//     root.innerHTML = `<"src="http://www.daejeon.go.kr/${dataValue}/>`
// }
// wait()
// export default server;