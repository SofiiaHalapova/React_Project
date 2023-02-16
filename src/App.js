import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import Authorization from "./components/authorization";
import Home from "./components/home";
import Content from "./components/content";
import Users from "./components/users";


class App extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Authorization/>}/>
                <Route path="/content" element={<Content/>}/>
                <Route path="/users" element={<Users/>}/>
            </Routes>
        );
    }

}

export default App;

