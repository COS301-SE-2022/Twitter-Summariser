import "./Login.css";
import Logo from "../Logo/Logo";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";

import { useState } from "react";

const Login = (props: any) => {
  const [wrongCredentials, setWrongCredentialsStatus] = useState(false);
  const [rightCredentials, setRightCredentialsStatus] = useState(true);
  // const [readyToLog, setReadyToLog] = useState(false);

  const style = { fontSize: "1.5rem", color: "red" };
  const style__ = { fontSize: "1.5rem", color: "green" };

  // username retrieval
  const [enteredUsername, changeEnteredUsername] = useState("");

  // username retrieval update
  const usernameHandler = (event: any) => {
    changeEnteredUsername(event.target.value);
    setWrongCredentialsStatus(false);
    setRightCredentialsStatus(true);
    // setReadyToLog(false);
  };

  // password retrieval
  const [enteredPassword, changeEnteredPassword] = useState("");

  // password retrieval update
  const passwordHandler = (event: any) => {
    changeEnteredPassword(event.target.value);
    setWrongCredentialsStatus(false);
    setRightCredentialsStatus(true);
    // setReadyToLog(false);
  };

  // ######################### API ###############################################

  const loginEndpoint =
    "https://czbmusycz2.execute-api.us-east-1.amazonaws.com/dev/login";

  // post request with error handling
  const checkCredentials = (userCredentials: any) => {
    // POST request using fetch with error handling
    console.log("inside check credentials function");
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(userCredentials),
    };

    fetch(loginEndpoint, requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");

        const data = isJson && (await response.json());

        // check for error response
        if (!response.ok) {
          // error
          setWrongCredentialsStatus(true);
          setRightCredentialsStatus(false);

          changeEnteredUsername("");
          changeEnteredPassword("");

          return;
        }

        const newData = {
          ...data,
          login: "true",
        };

        props.userLoginDetails(await newData);
      })
      .catch((error) => {
        console.log("Error in credentials given");
        setWrongCredentialsStatus(true);
        setRightCredentialsStatus(false);
      });
  };

  // #######################################################################

  const submitHandler = (event: any) => {
    event.preventDefault();

    const userDetails = {
      email: enteredUsername,
      password: enteredPassword,
    };

    checkCredentials(userDetails);
  };

  const signup = (event: any) => {
    event.preventDefault();

    const sign = {
      signup: true,
    };

    props.takeToSignupPage(sign);
  };

  // if (localStorage.getItem("newUser")) {
  // setWrongCredentialsStatus(false);
  // setRightCredentialsStatus(false);
  // setReadyToLog(true);
  // }

  return (
    // <div>Login Works</div>
    <div
      data-testid="login"
      className="flex justify-center flex-col items-center h-screen"
    >
      <div>
        <Logo width="136px" height="121px" page="login" />
      </div>

      <div>
        <h1 className="text-center text-xl font-bold">
          Sign in to Twitter
          <br />
          Summarizer
        </h1>
      </div>
      {rightCredentials && (
        <div>
          <br />
          <br />
        </div>
      )}
      {localStorage.getItem("newUser") && (
        <div className="flex flex-row border-2 border-green-700 rounded-md bg-green-300 h-auto w-auto m-4 mb-5 p-2">
          <AiOutlineCheckCircle style={style__} />
          <p>Ready to Explore Twitter Summarizer</p>
        </div>
      )}
      {wrongCredentials && (
        <div className="flex flex-row border-2 border-red-500 rounded-md bg-red-300 h-auto w-auto m-4 mb-5 p-2">
          <BiErrorCircle style={style} />
          <p>Invalid username or password</p>
        </div>
      )}
      <div>
        <form onSubmit={submitHandler} action="">
          <input
            data-testid="username-input"
            type="text"
            placeholder="Phone, email or username"
            className=" w-56 h-10 border-gray-200 border rounded-md text-center text-sm"
            onChange={usernameHandler}
            value={enteredUsername}
          />
          <br /> <br />
          <input
            data-testid="password-input"
            type="password"
            placeholder="password"
            className=" w-56 h-10 border-gray-200 border rounded-md text-center text-sm"
            onChange={passwordHandler}
            value={enteredPassword}
          />
          <br />
          <br />
          <button
            data-testid="btn-submit"
            type="submit"
            className="button__login text-sm p-0.5 h-10 w-56 bg-black rounded-full text-white"
          >
            Login
          </button>
          <br />
          <br />
          <br />
          <button
            data-testid="btn-forgot"
            type="submit"
            className="button__login text-sm p-0.5 h-10 w-56 bg-white border border-black text-black font-semibold rounded-full"
          >
            Forgot password?
          </button>
          <br />
          <br />
          <p className="text-sm text-center">
            Don't have an account?
            <button
              data-testid="btn-signup"
              type="submit"
              className=" text-sky-500"
              onClick={signup}
            >
              &nbsp; Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
