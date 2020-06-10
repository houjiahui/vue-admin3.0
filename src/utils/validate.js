// 过滤特殊字符
export function stripscript(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs+str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
// 验证邮箱
export function validateEmail(value){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value) ? true : false;
    // if(!reg.test(value)){
    //     return true
    // } else {
    //     return false
    // }
}
// 验证密码
export function validatePassword(value){
    let reg=/^(?![\d]+$)(?![a-zA-Z]+$)(?![/da-zA-Z]+$).{6,20}$/;
    // let reg1=/^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/;
    return !reg.test(value) ? true : false;
}
// 验证验证码
export function validateSendCode(value){
    let reg=/^([a-z0-9]{6})$/;
    return !reg.test(value) ? true : false;
}