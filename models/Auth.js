const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 해당 스키마에 있는것만 insert 됨!
const AuthSchema = new Schema({
    email : String,
    key : String,
    leftDate : { type: Date, default: Date.now  },
});




module.exports = mongoose.model('auth', AuthSchema);  // 첫번째 매개변수는 컬렉션 // 두번째 매개변수는 스키마
// crud 인터페이스를 제공한다!!