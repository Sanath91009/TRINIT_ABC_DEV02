import http from "./httpServices";
import config from "../config.json";

export function createTeam(teamName) {
    console.log("Tean Name : ", teamName);
    return http.post(config.apiUrl + "/createTeam", { teamName: teamName });
}
export function getAllTeams(emailid) {
    return http.get(config.apiUrl + "/getAllTeams", { emailid });
}
export function getTeam(teamName) {
    return http.get(config.apiUrl + "/getTeam", { teamName });
}

export function addEmployee(employee, teamName) {
    console.log("Team Name : ", teamName);
    return http.post(config.apiUrl + "/addEmployee", {
        employee: employee,
        teamName: teamName,
    });
}
