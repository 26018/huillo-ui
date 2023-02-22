import axios from 'axios';

export function register(data) {
    return axios.post('/user/register', data);
}

export function login(data) {
    return axios.post('/user/login', data);
}

export function user_ChangePassword(newP, oldP) {
    return axios.post('/user/update',{newPassword:newP, oldPassword: oldP})
}
export  function user_sendCode(account){
    return axios.post('/user/sendCode',{
        account: account,
    })
}