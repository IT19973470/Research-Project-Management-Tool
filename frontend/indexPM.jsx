import React from 'react';
import {createRoot} from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import {Header} from "./Header";
import Footer from "./Footer";
import {ContentPM} from "./ContentPM";


createRoot(document.getElementById('appPM')).render(
    <Router>
        <div>
            <Header/>
            <ContentPM/>
            <Footer/>
        </div>
    </Router>
);
