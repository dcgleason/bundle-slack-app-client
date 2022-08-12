const express = require('express')
const router = express.Router()


//users Home page
router.get('/',(req, res)=>{
    res.send("Users home page!!!")
})

module.exports = router;