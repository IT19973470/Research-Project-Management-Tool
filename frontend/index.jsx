import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from "./app";
import {Header} from "./Header";
import Footer from "./Footer";
import {BrowserRouter as Router} from "react-router-dom";

createRoot(document.getElementById('app')).render(
    <Router>
    <div>
        <Header/>
        <App/>
        <Footer/>
    </div>
    </Router>
);