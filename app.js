
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const config = require("./config/config");
const mongoose = require("mongoose");
var router = express.Router();





// 쿠키파서
app.use(cookieParser()); 

// 바디파서.
app.use(express.json()); // 예전에는 bodyparser를 사용했다고 함.. 지금은 express에 대체됨!
app.use(express.urlencoded({ extended: true })); // http 모듈에서 스트림을 청크로 받아서 합친다음에 가져온게 그냥 req.body 안에 들어 가있음. // 폼 파싱! , extended : true -> 쿼리스트링을 qs로 받는것!


// 뷰템플릿 pug
app.set('view engine' , 'pug');
app.set('views','views'); 

// 정적파일
app.use(express.static('views'));

// 몽고디비
// [ CONFIGURE mongoose ]
// CONNECT TO MONGODB SERVER
mongoose.set("useFindAndModify", false);
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect(config.db.url);

// 몽구스 스키마
// const Auth = require("./models/Auth");
// const MnmUser = require("./models/mnmUser");

// 라우터 분리
app.use("/",require("./routers/")); // 메인
app.use("/author",require("./routers/author")); // 인증



// 시작
app.listen(config.app.port, () => {
    console.log(`Example app listening at http://localhost:${config.app.port}`);
});
