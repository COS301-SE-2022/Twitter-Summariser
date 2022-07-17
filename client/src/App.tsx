import { Routes, Route } from "react-router-dom";
import RequiredAuth from "./auth/RequiredAuth";
import Layout from "./components/Layout";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Missing from "./components/Missing";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route element={<RequiredAuth />} >
                    <Route path="/" element={<Landing />} />
                </Route>
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
