import axios from 'axios';
export function login(data) {
    return axios.post('/api/user/login', data);
}
export function logout() {
    return axios.post('/api/user/logout');
}
export function getUserInfo() {
    return axios.post('/api/user/info');
}
export function getMenuList() {
    return axios.post('/api/user/menu');
}
//# sourceMappingURL=user.js.map