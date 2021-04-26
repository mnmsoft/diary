const express = require("express")
const router = express.Router();

// 메인 파일
router.get("/",(req,res) =>{
    res.sendFile(path.join(__dirname,"views","main.html"));
});


module.exports = router;