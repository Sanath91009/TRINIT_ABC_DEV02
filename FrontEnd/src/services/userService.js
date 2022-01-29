import http from "./httpServices";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/register";

export function register(user) {
    console.log(user, apiEndpoint);
    return http.post(apiEndpoint, user);
}
