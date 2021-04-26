const nodemailer = require("nodemailer");
const config = require("../config/config");


const joinMail = async (targetEmail, randomKey) => {
    let transporter = nodemailer.createTransport({
        // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
        service: "gmail",
        // host를 gmail로 설정
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            // Gmail 주소 입력, 'testmail@gmail.com'
            user: config.mail.id,
            // Gmail 패스워드 입력
            pass: config.mail.pass,
        },
    });

    let info = await transporter.sendMail({
        // 보내는 곳의 이름과, 메일 주소를 입력
        from: `"MNMSOFT" <${config.mail.username}>`,
        // 받는 곳의 메일 주소를 입력
        to: targetEmail,
        // 보내는 메일의 제목을 입력
        subject: "MNMSOFT 회원 인증 메일",
        // 보내는 메일의 내용을 입력
        // text: 일반 text로 작성된 내용
        // html: html로 작성된 내용
        // text: "TEST 메일",
        html: `<html>
                <body>
                    <h1 style='fnot-size:20px;'>MNMSOFT 회원가입 인증</h1>
                    <div style="width:400px;margin:30px;">
                        <div><b>안녕하세요!</b><br />엠엔엠소프트 사이트에 회원가입을 원하시면 아래 링크를 눌러주세요.</div>
                        <div><p><A href="${config.app.url}/author/joinAuth/?email=yanbn@naver.com&key=${randomKey}" target="_blank">[회원가입 이메일 인증]</p></div>
                        <div style='height:30px;'></div>
                        <div>만약 가입시도를 하지 않은것이라면 해당 메일을 무시하시면 됩니다.</div>
                    </div>
                <body>
            </html>`,
    });

    console.log("Message sent: %s", info.messageId);
};

const loginMail = async (targetEmail, randomKey) => {
    let transporter = nodemailer.createTransport({
        // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
        service: "gmail",
        // host를 gmail로 설정
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            // Gmail 주소 입력, 'testmail@gmail.com'
            user: config.mail.id,
            // Gmail 패스워드 입력
            pass: config.mail.pass,
        },
    });

    let info = await transporter.sendMail({
        // 보내는 곳의 이름과, 메일 주소를 입력
        from: `"MNMSOFT" <${config.mail.username}>`,
        // 받는 곳의 메일 주소를 입력
        to: targetEmail,
        // 보내는 메일의 제목을 입력
        subject: "MNMSOFT 회원 인증 메일",
        // 보내는 메일의 내용을 입력
        // text: 일반 text로 작성된 내용
        // html: html로 작성된 내용
        // text: "TEST 메일",
        html: `<html>
                <body>
                    <h1 style='fnot-size:20px;'>MNMSOFT 로그인 인증</h1>
                    <div style="width:400px;margin:30px;">
                        <div><b>안녕하세요!</b><br />엠엔엠소프트 사이트에 로그인을 원하시면 아래 링크를 눌러주세요.</div>
                        <div><p><A href="${config.app.url}/author/loginAuth/?email=yanbn@naver.com&key=${randomKey}" target="_blank">[로그인 이메일 인증]</p></div>
                        <div style='height:30px;'></div>
                        <div>만약 로그인시도를 하지 않은것이라면 해당 메일을 무시하시면 됩니다.</div>
                    </div>
                <body>
            </html>`,
    });

    console.log("Message sent: %s", info.messageId);
};

exports.joinMail = joinMail;
exports.loginMail = loginMail;
