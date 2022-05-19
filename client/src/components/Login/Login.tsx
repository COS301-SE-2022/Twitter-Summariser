import "./Login.css";
import Logo from "../Logo/Logo";

import { useState } from "react";

const Login = (props: any) => {
  // username retrieval
  const [enteredUsername, changeEnteredUsername] = useState("");

  // username retrieval update
  const usernameHandler = (event: any) => {
    changeEnteredUsername(event.target.value);
  };

  // password retrieval
  const [enteredPassword, changeEnteredPassword] = useState("");

  // password retrieval update
  const passwordHandler = (event: any) => {
    changeEnteredPassword(event.target.value);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();

    const userDetails = {
      username: enteredUsername,
      password: enteredPassword,
    };

    props.userLoginDetails(userDetails);

    changeEnteredUsername("");
    changeEnteredPassword("");
  };

  const signup = (event: any) => {
    event.preventDefault();

    const sign = {
      signup: true,
    };

    props.takeToSignupPage(sign);
  };

  return (
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
      <br />
      <br />
      <div>
        <form onSubmit={submitHandler} action="">
          <input
            type="text"
            placeholder="Phone, email or username"
            className=" w-56 h-10 border-gray-200 border rounded-md text-center text-sm"
            onChange={usernameHandler}
            value={enteredUsername}
          />
          <br /> <br />
          <input
            type="password"
            placeholder="password"
            className=" w-56 h-10 border-gray-200 border rounded-md text-center text-sm"
            onChange={passwordHandler}
            value={enteredPassword}
          />
          <br />
          <br />
          <button
            type="submit"
            className="button__login text-sm p-0.5 h-10 w-56 bg-black rounded-full text-white"
          >
            Login
          </button>
          <br />
          <br />
          <br />
          <button
            type="submit"
            className="button__login text-sm p-0.5 h-10 w-56 bg-white border border-black text-black font-semibold rounded-full"
          >
            Forgot password?
          </button>
          <br />
          <br />
          <p className="text-sm text-center">
            Don't have an account?
            <button type="submit" className=" text-sky-500" onClick={signup}>
              &nbsp; Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
