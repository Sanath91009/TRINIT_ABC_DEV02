import http from "./httpServices";
import config from "../config.json";
import jwtDecode from "jwt-decode";
const apiEndpoint = config.apiUrl + "/auth";

const tokenKey = "token";
http.setjwt(getjwt());
export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
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
export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}
export default {
    login,
    logout,
    getCurrentUser,
    LoginWithjwt,
    getjwt,
};
