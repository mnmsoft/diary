// 아래 소스는 템플릿에서 호출하는 js 이기 때문에 node 가 뛰우는게 아니라 html 이 띄우는것임.
// 그렇기에 이렇게 동작할수가 없음..
// 그냥 submit 하는 수 밖에??
//import axios from '../../node_modules/axios'

const loginCall = () => {
    // 이메일 유효성 체크
    var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!emailRule.test(document.querySelector("input[name='email']").value)) {
        Toastify({
            text: "이메일정보를 확인해주세요.",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
        return false;
    }

    axios
        .post("/author/authreq", {
            email: document.querySelector("input[name='email']").value,
        })
        .then((res) => {
            // console.log(res);
            document.querySelector(".loginForm").classList.add("readOnly2");

            Toastify({
                text: "이메일이 발송되었어요.",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
        })
        .catch((err) => {
            console.log(err);
            document.querySelector(".loginForm").classList.remove("readOnly");
            document.querySelector(".loginForm").classList.remove("readOnly2");
            Toastify({
                text: "오류가 발생되었습니다. 잠시후 다시 시해도해주요.",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
        });
};

function logout() {
    fetch("/author/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: document.querySelector("input[name=email]").value,
        }),
    })
        .then((res) => {
            if (res.formData.returnCode == 1) {
                location.href = "/";
            }
        })
        .catch((err) => {
            location.href = "/";
        });
}

function openLoginPopup() {
    document.querySelector(".loginWorld").classList.remove("off");
    document.querySelector(".loginWorld").classList.add("on");
    document.querySelector("body").style.overflowY = "hidden";
}

function closeLoginPopup() {
    document.querySelector(".loginWorld").classList.remove("on");
    document.querySelector(".loginWorld").classList.add("off");
    document.querySelector("body").style.overflowY = "initial";

    // 로그인 버튼 중복처리 방지를 초기화.
    document.querySelector(".loginForm").classList.remove("readOnly");
    document.querySelector(".loginForm").classList.remove("readOnly2");
}

const redraw = () =>{
    // console.log("resize",window.innerWidth);
    // console.log(document.querySelector(".jobWorld").getClientRects()[0].width);
    // console.log(document.querySelector(".jobWorld").getClientRects()[0].width * 90 / 100);
    // console.log(document.querySelector(".jobWorld").getClientRects()[0].width * 90 / 100 / 2);
    const jobWorldHeight = document.querySelector(".jobWorld").getClientRects()[0].width * 90 / 100 / 2 * 1.1;
    // console.log("jobWorldHeight", jobWorldHeight);
    document.querySelector(".jobWorld").style.height = `${jobWorldHeight}px`;


    
}


window.addEventListener("load", () => {});

window.addEventListener("resize", () => {
    redraw();
});

document.addEventListener("DOMContentLoaded", () => {

    // 로그인 체크
    axios.post("/author/loginCheck").then((result) => {
        (() => {
            if (result.data.returnCode == 1) {
                document.querySelector(".loginButton").style.display = "none";
                document.querySelector(".myInfo").style.display = "block";
            } else {
                document.querySelector(".loginButton").style.display = "block";
                document.querySelector(".myInfo").style.display = "none";
            }
        })();
    });

    // 화면 그리기.
    redraw();
});
