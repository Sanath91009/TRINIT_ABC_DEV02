import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import Register from "./components/register";
import Login from "./components/login";
import Logout from "./components/logout";
import Dashboard from "./components/dashboard";
import Home from "./components/home";
import { getUser } from "./services/authService";
import NotFound from "./components/notfound";
import CreateNewTeam from "./components/createNewTeam";
import AddTeamMembers from "./components/addTeamMembers";
import AddBugs from "./components/addBugs";
import GetTeams from "./components/getTeams";
import TeamProfile from "./components/TeamProfile";
import EditProfle from "./components/EditProfle";
import EditEmployee from "./components/EditEmployee";
import ViewAllBugs from "./components/viewAllBugs";
import ViewBug from "./components/viewBug";
class App extends Component {
    state = {
        user: null,
    };
    componentDidMount() {
        try {
            const user = getUser();
            this.setState({ user });
        } catch (ex) {
            this.setState({ user: null });
        }
    }
    render() {
        const { user } = this.state;
        console.log("app.js: ", user);
        return (
            <React.Fragment>
                <ToastContainer />
                <div className="fullPage">
                    <Navbar user={user} />
                    <Routes>
                        <Route path="/TeamProfile" element={<TeamProfile />} />
                        <Route
                            path="/createNewTeam"
                            element={<CreateNewTeam />}
                        />
                        <Route
                            path="/EditEmployee"
                            element={<EditEmployee />}
                        />
                        <Route
                            path="/dashboard"
                            element={
                                user ? (
                                    <Dashboard user={user} />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route path="/viewBug" element={<ViewBug />} />
                        <Route path="/viewAllBugs" element={<ViewAllBugs />} />
                        <Route path="/editProfile" element={<EditProfle />} />
                        <Route path="/getTeams" element={<GetTeams />} />
                        <Route
                            path="/addTeamMembers"
                            element={<AddTeamMembers />}
                        />
                        <Route path="/addBugs" element={<AddBugs />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route
                            path="/register"
                            element={<Register history={this.props.history} />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/notfound" element={<NotFound />} />
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="*" element={<Navigate to="/notfound" />} />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
