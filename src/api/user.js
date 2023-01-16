import axios from 'axios';

export function register(data) {
    return axios.post('http://localhost/user/register', data);
}

export function login(data) {
    return axios.post('http://localhost/user/login', data);
}