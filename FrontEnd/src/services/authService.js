import http from "./httpServices";
import jwt_decode from "jwt-decode";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/login";

const tokenKey = "token";
http.setjwt(getjwt());
export async function login(email_id, password) {
    const { data } = await http.post(apiEndpoint, { email_id, password });
    localStorage.setItem(tokenKey, data);
}
export function logout() {
    localStorage.removeItem(tokenKey);
}
export function LoginWithjwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}
export function getjwt() {
    return localStorage.getItem(tokenKey);
}
export function getUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwt_decode(jwt);
    } catch (ex) {
        return null;
    }
}
export default {
    login,
    logout,
    getUser,
    LoginWithjwt,
    getjwt,
};
