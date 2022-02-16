import http from "./httpServices";
import config from "../config.json";

export function createTeam(teamName) {
    return http.post(config.apiUrl + "/createTeam", { teamName: teamName });
}
export function getAllTeams(emailid) {
    return http.post(config.apiUrl + "/getAllTeams", { emailid: emailid });
}
export function getTeam(teamName) {
    return http.get(config.apiUrl + `/team/${teamName}`);
}
export function DeleteEmployee(teamName, emailid) {
    return http.post(config.apiUrl + "/employee/delete", {
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
    return http.post(config.apiUrl + "/bug/create", {
        teamName: teamName,
        bug: bug,
    });
}
export function addPost(teamName, post, bugidx) {
    console.log(teamName, post);
    return http.post(config.apiUrl + "/post/create", {
        teamName: teamName,
        post: post,
        index: bugidx,
    });
}
export function deletePost(teamName, index, post) {
    console.log(index);
    return http.post(config.apiUrl + "/post/delete", {
        teamName: teamName,
        index: index,
        post: post,
    });
}
export function updateBug(teamName, bug, index) {
    return http.post(config.apiUrl + "/bug/update", {
        teamName: teamName,
        bug: bug,
        index: index,
    });
}
export function deleteBug(teamName, index) {
    return http.post(config.apiUrl + "/bug/delete", {
        teamName: teamName,
        index: index,
    });
}
export function editEmployee(idx, teamName, emailid, role) {
    console.log(idx, teamName, emailid, role);
    return http.post(config.apiUrl + "/employee/update", {
        teamName: teamName,
        Eemail: emailid,
        idx: idx,
        role: role,
    });
}
export function addEmployee(employee, teamName, mail_id) {
    console.log("Team Name : ", teamName);
    return http.post(config.apiUrl + "/employee/create", {
        employee: employee,
        teamName: teamName,
        mail_id: mail_id,
    });
}

export function getInvitations(email_id) {
    return http.post(config.apiUrl + "/invitations/get", {
        email_id: email_id,
    });
}

export function acceptInvitations(teamName, _id) {
    return http.post(config.apiUrl + "/invitations/accept", {
        teamName: teamName,
        _id: _id,
    });
}
export function rejectInvitations(_id) {
    return http.post(config.apiUrl + "/invitations/reject", {
        _id: _id,
    });
}
