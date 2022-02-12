import http from "./httpServices";
import config from "../config.json";

export function createTeam(teamName) {
    return http.post(config.apiUrl + "/createTeam", { teamName: teamName });
}
export function getAllTeams(emailid) {
    return http.post(config.apiUrl + "/getAllTeams", { emailid: emailid });
}
export function getTeam(teamName) {
    return http.post(config.apiUrl + "/getTeam", { teamName });
}
export function DeleteEmployee(teamName, emailid) {
    return http.post(config.apiUrl + "/deleteEmployee", {
        teamName: teamName,
        emailid: emailid,
    });
}
export function getRoleOfUser(teamName, emailid) {
    console.log(emailid, teamName);
    return http.post(config.apiUrl + "/getRoleOfUser", {
        teamName: teamName,
        emailid: emailid,
    });
}
export function addBug(teamName, bug) {
    console.log(teamName, bug);
    return http.post(config.apiUrl + "/addBug", {
        teamName: teamName,
        bug: bug,
    });
}
export function updateBug(teamName, bug, index) {
    return http.post(config.apiUrl + "/updateBug", {
        teamName: teamName,
        bug: bug,
        index: index,
    });
}
export function deleteBug(teamName, index) {
    return http.post(config.apiUrl + "/deleteBug", {
        teamName: teamName,
        index: index,
    });
}
export function editEmployee(idx, teamName, emailid, role) {
    console.log(idx, teamName, emailid, role);
    return http.post(config.apiUrl + "/EditEmployee", {
        teamName: teamName,
        Eemail: emailid,
        idx: idx,
        role: role,
    });
}
export function addEmployee(employee, teamName) {
    console.log("Team Name : ", teamName);
    return http.post(config.apiUrl + "/addEmployee", {
        employee: employee,
        teamName: teamName,
    });
}
