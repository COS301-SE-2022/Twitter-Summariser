
import React from "react";

const submitLoginForm = () => {
  //insert code to submit login form
}

const LoginBody = () => {
  return (
    <div className="login-body">
      <form onSubmit={submitLoginForm}>
        <input type="text" placeholder="Phone, email or username"/>
        <br/>
        <input type="password" placeholder="Password"/>
        <br/>
        <input type="submit" value="Log in"/>
      </form>
    </div>
  )
}

export default LoginBody;
