import Landing from "./components/Landing/Landing";
// import Login from "./components/Login/Login";
// import Signup from "./components/Signup/Signup";
import "./index.css";

// main Application component in which different page sub-components will be contained
const App = () => {
  // state function comes here

  return (
    <div className="">
      {/* Login */}
      {/* <Login /> */}
      {/* Signup */}
      {/* <Signup /> */}
      {/* Entry here based on Signup and Login decision  */}
      <Landing />;
    </div>
  );
};

export default App;
