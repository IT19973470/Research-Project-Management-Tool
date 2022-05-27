import React from 'react';
import {createRoot} from 'react-dom/client';
import {Header} from "./Header";
import Footer from "./Footer";
import {BrowserRouter as Router} from "react-router-dom";
import {ContentAd} from "./ContentAd";

createRoot(document.getElementById('appA')).render(
    <Router>
        <div>
            <Header/>
            <ContentAd/>
            <Footer/>
        </div>
    </Router>
);