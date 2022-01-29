import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import Register from "./components/register";
import Login from "./components/login";
import Logout from "./components/logout";

class App extends Component {
    state = {
        user: null,
    };
    async componentDidMount() {
        // try {
        //     const user = await User.getUser();
        //     this.setState({ user });
        // } catch (ex) {
        //     this.setState({ user: null });
        // }
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
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
