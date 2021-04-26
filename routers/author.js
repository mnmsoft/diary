const express = require("express");
const router = express.Router();
const path = require("path");

// 유틸
const util = require("../utils/util.js");
const sendMail = require("../utils/sendMail.js");

// 몽구스 스키마
const Auth = require("../models/Auth");
const MnmUser = require("../models/mnmUser");

// 회원 가입 인증 처리
router.post("/joinAuth", (req, res) => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const nowDate = new Date(Date.now() - timezoneOffset);

    Auth.find({ email: req.body.email, key: req.body.key }, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ returnCode: 0, returnMessage: "디비에러" });
            return;
        }
        if (data.length == 0) {
            res.status(500).json({ returnCode: 0, returnMessage: "인증정보가 없습니다." });
        } else {
            // 시간 비교
            // console.log(1,new Date(data[0].leftDate));
            // console.log(2,nowDate);
            if (new Date(data[0].leftDate) > nowDate) {
                // 성공이면 Auth에 사용자 정보를 넣는다.
                const mnmUser = new MnmUser();
                mnmUser.email = req.body.email;
                mnmUser.userName = "";
                mnmUser.profile_image_url = "";
                mnmUser.introduce = "";
                mnmUser.joinDate = nowDate;

                mnmUser.save(function (err) {
                    // console.log("save in");
                    if (err) {
                        console.error(err);
                        res.status(500).json({ returnCode: 0, returnMessage: "디비에러" });
                    }
                });
                res.status(200).json({ returnCode: 1, returnMessage: "성공" });
            } else {
                res.status(500).json({ returnCode: 0, returnMessage: "인증만료시간이 지났습니다." });
            }
        }
    });
});

//로그인 인증처리
router.post("/loginAuth", (req, res) => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const nowDate = new Date(Date.now() - timezoneOffset);

    Auth.find({ email: req.body.email, key: req.body.key }, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ returnCode: 0, returnMessage: "디비에러" });
            return;
        }
        if (data.length == 0) {
            res.status(500).json({ returnCode: 0, returnMessage: "인증정보가 없습니다." });
        } else {
            // 시간 비교
            // console.log(1,new Date(data[0].leftDate));
            // console.log(2,nowDate);
            if (new Date(data[0].leftDate) > nowDate) {
                // 성공이면 로그인 쿠키를 발급한다.
                // 로그인 쿠키 발급.
                res.status(200).json({ returnCode: 1, returnMessage: "성공" });
            } else {
                res.status(500).json({ returnCode: 0, returnMessage: "인증만료시간이 지났습니다." });
            }
        }
    });
});


// 회원 가입 인증 처리
router.get("/joinAuth", (req, res) => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const nowDate = new Date(Date.now() - timezoneOffset);

    Auth.find({ email: req.query.email, key: req.query.key }, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ returnCode: 0, returnMessage: "디비에러" });
            return;
        }
        if (data.length == 0) {
            res.status(500).json({ returnCode: 0, returnMessage: "인증정보가 없습니다." });
        } else {
            // 시간 비교
            // console.log(1,new Date(data[0].leftDate));
            // console.log(2,nowDate);
            if (new Date(data[0].leftDate) > nowDate) {
                // 성공이면 Auth에 사용자 정보를 넣는다.
                const mnmUser = new MnmUser();
                mnmUser.email = req.body.email;
                mnmUser.userName = "";
                mnmUser.profile_image_url = "";
                mnmUser.introduce = "";
                mnmUser.joinDate = nowDate;

                mnmUser.save(function (err) {
                    // console.log("save in");
                    if (err) {
                        console.error(err);
                        res.status(500).json({ returnCode: 0, returnMessage: "디비에러" });
                    }
                });
                res.status(200).json({ returnCode: 1, returnMessage: "성공" });
            } else {
                res.status(500).json({ returnCode: 0, returnMessage: "인증만료시간이 지났습니다." });
            }
        }
    });
});

router.get("/loginAuth", (req, res) => {
    // query , params , body
    // 쿼리스트링 , 라우터에 매칭되는 매개변수 , post 로 주고 받는 메시지(?)

    // console.log(req.query);
    // console.log(req.params);
    // console.log(req.query.email);
    // console.log(req.query.key);

    // 인증처리
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const nowDate = new Date(Date.now() - timezoneOffset);

    Auth.find({ email: req.query.email, key: req.query.key }, (err, data) => {
        if (err) {
            console.error(err);
            // res.redirect("/?error=1")
            res.status(500).json({ returnCode: 0, returnMessage: "디비에러" });
        }
        if (data.length == 0) {
            // res.redirect("/?error=1")
            res.status(500).json({ returnCode: 0, returnMessage: "인증정보가 없습니다." });
        } else {
            // 시간 비교
            // console.log(1,new Date(data[0].leftDate));
            // console.log(2,nowDate);
            if (new Date(data[0].leftDate) > nowDate) {
                // 로그인 쿠키 발급
                util.makeJWT(req.query.email)
                    .then((returnJWT) => {
                        res.cookie("mja", returnJWT, {
                            maxAge: 2592000000, // 카카오에서 받은건 초단위고 cookie-parser에서 처리는 밀리세컨드라 1000 곱해줌. (1달)
                            httpOnly: true,
                            path: "/",
                        });
                        res.redirect("/");
                    })
                    .catch((error) => {
                        res.status(500).json({ returnCode: 0, returnMessage: "인증 검증 에러" });
                    });
            } else {
                // res.redirect("/?error=1")
                res.status(500).json({ returnCode: 0, returnMessage: "인증만료시간이 지났습니다." });
            }
        }
    });
});

// * 인증요청 ****************************************************************************
// 이메일 인증이 들어오면 기존 회원일 경우 로그인 인증을 진행하고
// 신규회원일경우 회원가입 인증을 진행한다.
router.post("/authreq", (req, res) => {
    // 이메일과 임시로 만든 랜덤키를 저장하고
    // 해당요청이 링크로 들어오면 인증처리함!

    let randomKey = "";

    console.log(req.body);

    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const leftDate = new Date(Date.now() - timezoneOffset);
    leftDate.setMinutes(leftDate.getMinutes() + 10);
    if (req.body.email) {
        for (i = 0; i < 10; i++) {
            randomKey += String.fromCharCode(Math.random() * 26 + 97);
        }
        // console.log(randomKey);

        // 이메일 주소와 키값을 db에 넣고 해당 키로 이메일 발송!
        Auth.updateOne(
            { email: req.body.email, key: randomKey },
            {
                $set: {
                    email: req.body.email,
                    key: randomKey,
                    leftDate: leftDate,
                },
            },
            {
                upsert: true,
            },
            function (err) {
                if (err) {
                    console.error(err);
                    res.status(500).json({ returnCode: 0, returnMessage: "디비에러" });
                    return;
                }
            }
        );

        // 1.회원가입이 되어 있었는지 판단!
        MnmUser.find({ email: req.body.email }, (err, data) => {
            if (err) res.status(500).json({ returnCode: 0, returnMessage: "디비에러" });
            if (data.length > 0) {
                sendMail
                    .loginMail(req.body.email, randomKey)
                    .then((result) => {
                        res.status(200).json({ returnCode: 1, returnMessage: "로그인 메일 발송" });
                    })
                    .catch((error) => {
                        res.status(500).json({ returnCode: 0, returnMessage: "에러" + error });
                    });
            } else {
                sendMail
                    .joinMail(req.body.email, randomKey)
                    .then((result) => {
                        res.status(200).json({ returnCode: 1, returnMessage: "가입메일 발송" });
                    })
                    .catch((error) => {
                        res.status(500).json({ returnCode: 0, returnMessage: "에러" + error });
                    });
            }
        });
    } else {
        res.status(500).json({ returnCode: 0, returnMessage: "이메일 정보가 없습니다." });
    }
});

router.post("/loginCheck", (req, res) => {
    // console.log(req.cookies.mja);
    util.checkJWT(req.cookies.mja)
        .then((result) => {
            res.status(200).json({ returnCode: 1 });
        })
        .catch((err) => {
            res.status(200).json({ returnCode: 0 });
        });
});

router.post("/logout", (req, res) => {
    res.clearCookie("mja");
    res.status(200).json({ returnCode: 1 });
});

module.exports = router;
