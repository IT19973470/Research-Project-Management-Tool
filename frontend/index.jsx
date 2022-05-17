import React from 'react';
import {createRoot} from 'react-dom/client';
import {Header} from "./Header";
import {Content} from "./Content";
import Footer from "./Footer";
import {BrowserRouter as Router} from "react-router-dom";

createRoot(document.getElementById('app')).render(
    <Router>
        <div>
            <Header/>
            <Content/>
            <Footer/>
        </div>
    </Router>
);