import cookie from 'cookie_js';
const adminToken = 'admin_toKen';
const admiUsername = 'username';
export function getToken(){
    return cookie.get(adminToken);
}
export function setToKen(){
    return cookie.set(adminToken);
}
export function removeToKen(){
    return cookie.remove(adminToken);
}
export function setUsername(value){
    return cookie.set(admiUsernamekey,value);
}
export function getUsername(){
    return cookie.get(admiUsernamekey);
}
export function removeUsername(){
    return cookie.remove(admiUsernamekey);
}