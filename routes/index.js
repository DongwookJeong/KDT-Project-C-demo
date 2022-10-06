const express = require('express')
const app = express()
const path = require("path")
const port = 5000;
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const cart = require('../routes/cart')
app.use('/cart',cart)

const add = require('../add/add.js')
app.use('/add',add)



app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/`)
})