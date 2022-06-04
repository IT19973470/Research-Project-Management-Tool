import React from 'react';
import {createRoot} from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import {Header} from "./Header";
import Footer from "./Footer";
import {ContentSup} from "./ContentSup";


createRoot(document.getElementById('Sup')).render(
    <Router>
        <div>
            <Header/>
            <ContentSup/>
            <Footer/>
        </div>
    </Router>
);
