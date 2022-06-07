import "./Splash.css";
import Logo from "../Logo/Logo";

import { useState } from "react";

const Splash = (props: any) => {

  return (
    <div
      data-testid="splash"
      className="flex justify-center flex-col items-center h-screen"
    >
      <div>
        <Logo width="136px" height="121px" page="login" />
      </div>

      <div>
        <h1 className="text-center text-xl font-bold">Welcome to Twitter Summariser</h1>
      </div>
      <br />
      {/* unacceptable name notification */}
      {/*  */}
      <div>
          <div className="flex flex-row">
            &nbsp;
          </div>
          <button
            data-testid="btn-signup"
            className="button__login text-sm p-0.5 h-10 w-56 bg-black rounded-full text-white"
          >
            Sign up
          </button>
          <br />
          <p className="text-sm text-center">
            Already have an account? </p>
            <button
              data-testid="btn-login"
              className="button__login text-sm p-0.5 h-10 w-56 bg-black rounded-full text-white"
            >
              Login
            </button>
      </div>
    </div>
  );
};

export default Splash;
