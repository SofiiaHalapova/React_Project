import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import Authorization from "./components/authorization";
import Home from "./components/home";
import Dashboard from "./pages/dashboard/dashboard";


class App extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Authorization/>}/>
                <Route path="/dashboard/*" element={<Dashboard/>}/>
            </Routes>
        );
    }

}

export default App;

