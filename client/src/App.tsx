import { Routes, Route } from "react-router-dom";
import RequiredAuth from "./auth/RequiredAuth";
import Layout from "./pages/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Missing from "./pages/Missing";

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
