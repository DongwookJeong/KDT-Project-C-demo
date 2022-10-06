const express = require('express')
const router = express.Router()


router.get('/hi', async(req,res) => {
    const dbData = await test()
    res.send("hi")
})

module.exports = router;