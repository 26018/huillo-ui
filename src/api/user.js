import axios from 'axios';

export function register(data) {
    return axios.post('/user/register', data);
}

export function login(data) {
    return axios.post('/user/login', data);
}