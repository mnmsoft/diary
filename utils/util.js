const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.checkJWT = async (jwttoken) => {
  return await jwt.verify(jwttoken,config.app.JWTKEY)
};

exports.makeJWT = async (email) => {

    return await jwt.sign(
     {
        email
     },
     config.app.JWTKEY,
     {
       expiresIn: "30d",
       issuer: "mnmsoft.co.kr",
       subject: "userInfo",
     }
   )
 
 };

exports.korTime = () =>{
    const myDate = new Date()
    return new Date(myDate.getFullYear() , myDate.getMonth() , myDate.getDate() , myDate.getHours() + 9, myDate.getMinutes() , myDate.getSeconds())
  }
  
  exports.korTimeAdd = (gubun , number) =>{
  
    const myDate = new Date()
    
    switch (gubun) {
      case "y":
        return new Date(myDate.getFullYear() + number , myDate.getMonth() , myDate.getDate() , myDate.getHours() + 9, myDate.getMinutes() , myDate.getSeconds() )
      case "M":
        return new Date(myDate.getFullYear()  , myDate.getMonth() + number, myDate.getDate() , myDate.getHours() + 9, myDate.getMinutes() , myDate.getSeconds() )
      case "d":
        return new Date(myDate.getFullYear() , myDate.getMonth() , myDate.getDate() + number , myDate.getHours() + 9, myDate.getMinutes() , myDate.getSeconds() )
      case "h":
        return new Date(myDate.getFullYear() , myDate.getMonth() , myDate.getDate() , myDate.getHours() + 9 + number , myDate.getMinutes() , myDate.getSeconds() )
      case "m":
          return new Date(myDate.getFullYear() , myDate.getMonth() , myDate.getDate() , myDate.getHours() + 9 , myDate.getMinutes() + number , myDate.getSeconds() )      
      case "s":
        return new Date(myDate.getFullYear() , myDate.getMonth() , myDate.getDate() , myDate.getHours() + 9, myDate.getMinutes() , myDate.getSeconds() + number )
      case "ss":
          return new Date(myDate.getFullYear() , myDate.getMonth() , myDate.getDate() , myDate.getHours() + 9, myDate.getMinutes() , myDate.getSeconds() , myDate.getMilliseconds() + number)            
      default:
        return new Date(myDate.getFullYear() , myDate.getMonth() , myDate.getDate() , myDate.getHours() + 9, myDate.getMinutes() , myDate.getSeconds() )
    }
    
  }