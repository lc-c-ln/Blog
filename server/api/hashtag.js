const express = require('express')
const router = express.Router();

router.get("/",(req,res) => {
    console.log("s");
    res.send("Test");
})

module.exports = router;

