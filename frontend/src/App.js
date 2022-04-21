import logo from './logo.svg';
import './App.css';
import StudentRegister from "./student/StudentRegister";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./login/Login";
import Header from "./Header";

function App() {
    return (
        <div>
            <Header />
            <Login />
        </div>
    );
}

export default App;