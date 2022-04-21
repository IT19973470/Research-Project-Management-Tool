import logo from './logo.svg';
import './App.css';
import StudentRegister from "./student/StudentRegister";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./login/Login";
import Header from "./Header";
import Footer from "./Footer";

function App() {
    return (
        <div>
            <Header/>
            <Login/>
            <Footer/>
        </div>
    );
}

export default App;