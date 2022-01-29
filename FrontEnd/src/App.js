import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import Register from "./components/register";
import Login from "./components/login";
import Logout from "./components/logout";
import Profile from "./components/profile";
import Home from "./components/home";
import { getUser } from "./services/authService";
import NotFound from "./components/notfound";
class App extends Component {
    state = {
        user: null,
    };
    async componentDidMount() {
        try {
            const user = await getUser();
            this.setState({ user });
        } catch (ex) {
            this.setState({ user: null });
        }
    }
    render() {
        const { user } = this.state;
        return (
            <React.Fragment>
                <ToastContainer />
                <div className="fullPage">
                    <Navbar user={user} />
                    <Routes>
                        <Route
                            path="/profile"
                            element={
                                user ? <Profile /> : <Navigate to="/login" />
                            }
                        />
                        <Route path="/home" element={<Home />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route
                            path="/register"
                            element={<Register history={this.props.history} />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/notfound" element={<NotFound />} />
                        <Route path="/" element={<Navigate to="/notfound" />} />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
